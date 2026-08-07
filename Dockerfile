# syntax=docker/dockerfile:1.7
# ===========================================================================
# Dockerfile — Imagem de produção da landing Best Fluency (static-first).
#
# Arquitetura (ADR-0001): o site é exportado para HTML/CSS/JS estático com
# Next.js (output: "export") e servido por Nginx dentro de um container.
# Não existe runtime Node.js em produção.
#
# Build multi-stage reproduzível, sem credenciais e sem segredos:
#   Stage 1  builder              — instala dependências e gera o export em out/
#   Stage 2  nginx-module-builder — compila o módulo Brotli (dynamic) do Nginx
#   Stage 3  runtime              — Nginx Alpine pinado + artefato estático
#                                   + módulo Brotli + configuração
#
# A imagem final contém APENAS: artefato estático, Nginx, módulo Brotli e
# configuração. Nenhuma devDependency, nenhum source code e nenhum segredo.
# ===========================================================================

##########################
# Stage 1 — build estático
##########################
FROM node:24.19.0-alpine3.24 AS builder

# Build reproduzível a partir do repo, SEM credenciais. Em produção a URL
# pública, a indexação e o token de analytics entram por --build-arg (mesmos
# defaults seguros do .env.example; valores reais só no lançamento).
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_SITE_INDEXABLE=false
ARG NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SITE_INDEXABLE=$NEXT_PUBLIC_SITE_INDEXABLE \
    NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=$NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Camada de dependências: instala com lockfile (npm ci) e fica em cache.
# NOTA: NODE_ENV=production NÃO é definido aqui — o `next build` já corre em
# modo produção e as devDependencies (typescript, tailwind) são necessárias
# para compilar o export estático.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Código-fonte (o .dockerignore exclui node_modules/.next/out/.env*/.git).
COPY . .

# Gate i18n (prebuild) + export estático.
RUN npm run build

##############################
# Stage 2 — módulo Brotli
##############################
# Compila o módulo dinâmico ngx_brotli contra a MESMA versão do Nginx usado no
# runtime (1.30.4) com --with-compat, para o .so ser carregável pelo binário
# oficial nginx:alpine. Versões fixadas: nginx 1.30.4 (sha256 verificado),
# ngx_brotli no commit a71f9312 (última revisão do upstream).
FROM alpine:3.24 AS nginx-module-builder

ENV NGINX_VERSION=1.30.4 \
    NGINX_SHA256=4261dc90e9e47c1c4041276e9aaa3d48ebe2e664f728e14fa95ae6c67d57a08b \
    NGX_BROTLI_COMMIT=a71f9312c2deb28875acc7bacfdd5695a111aa53

RUN apk add --no-cache \
        cmake \
        gcc \
        git \
        libc-dev \
        linux-headers \
        make \
        musl-dev \
        openssl-dev \
        pcre2-dev \
        tar \
        wget \
        zlib-dev

WORKDIR /build
RUN wget -q "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" \
    && echo "${NGINX_SHA256}  nginx-${NGINX_VERSION}.tar.gz" | sha256sum -c - \
    && tar -xzf "nginx-${NGINX_VERSION}.tar.gz" \
    && git clone --depth 1 https://github.com/google/ngx_brotli.git \
    && cd ngx_brotli \
    && git checkout "${NGX_BROTLI_COMMIT}" \
    && git submodule update --init --recursive

# As libs estáticas do Brotli têm de ficar em deps/brotli/out (é o caminho
# que o filter/config do ngx_brotli usa na linha de link: -L deps/brotli/c/../out).
RUN cmake -S /build/ngx_brotli/deps/brotli -B /build/ngx_brotli/deps/brotli/build \
        -DCMAKE_BUILD_TYPE=Release \
        -DBUILD_SHARED_LIBS=OFF \
        -DCMAKE_C_FLAGS="-fPIC" \
        -DCMAKE_INSTALL_PREFIX=/build/ngx_brotli/deps/brotli/out \
    && cmake --build /build/ngx_brotli/deps/brotli/build -j"$(nproc)" \
    && cmake --install /build/ngx_brotli/deps/brotli/build \
    && cp /build/ngx_brotli/deps/brotli/out/lib/*.a /build/ngx_brotli/deps/brotli/out/

WORKDIR /build/nginx-${NGINX_VERSION}
RUN ./configure --with-compat --add-dynamic-module=../ngx_brotli \
    && make modules -j"$(nproc)"

##########################
# Stage 3 — runtime Nginx
##########################
FROM nginx:1.30.4-alpine3.24 AS runtime

LABEL org.opencontainers.image.title="best-fluency-web" \
      org.opencontainers.image.description="Landing static-first Best Fluency servida por Nginx (Brotli)" \
      org.opencontainers.image.source="https://github.com/vianahub-pt/VianaHub.Global.BestFluency.Web"

# Módulo Brotli compilado no stage anterior.
COPY --from=nginx-module-builder /build/nginx-1.30.4/objs/ngx_http_brotli_filter_module.so /etc/nginx/modules/
COPY --from=nginx-module-builder /build/nginx-1.30.4/objs/ngx_http_brotli_static_module.so /etc/nginx/modules/

# Artefato estático do export (HTML/CSS/JS, 7 locales, sitemap, robots, 404).
COPY --from=builder /app/out/ /usr/share/nginx/html/

# Configuração Nginx + entrypoint.
COPY infra/nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY infra/nginx/nginx.ssl.conf.template /etc/nginx/nginx.ssl.conf.template
COPY infra/nginx/security-headers.conf.template /etc/nginx/security-headers.conf.template
COPY infra/nginx/docker-entrypoint.sh /docker-entrypoint.sh

# Usuário não-root: o master do Nginx corre como uid 101 (nginx no alpine) e
# escuta portas >= 1024 (8080 http / 8443 https). As portas públicas 80/443
# são mapeadas no docker-compose.yml para as portas internas do container.
RUN chmod +x /docker-entrypoint.sh \
    && mkdir -p /var/cache/nginx /var/run/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run/nginx /etc/nginx

USER nginx

EXPOSE 8080 8443

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
