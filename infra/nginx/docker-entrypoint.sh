#!/bin/sh
# ===========================================================================
# docker-entrypoint.sh — arranque do container Nginx da landing Best Fluency.
#
# Responsabilidades:
#   1. Renderizar o snippet de security headers com o CSP configurável por env
#      (CSP_DEFAULT_SRC; default 'self').
#   2. Detetar TLS: se /etc/nginx/certs contiver fullchain.pem + privkey.pem,
#      usa nginx.ssl.conf.template (HTTPS na origem + redirect HTTP->HTTPS);
#      caso contrário serve apenas HTTP (nginx.conf.template).
#   3. Com TLS ativo, HSTS fica DESATIVADO por padrão; só é adicionado com
#      HSTS_ENABLED=1 (após validar HTTPS/subdomínios no lançamento).
#
# Container roda como usuário não-root (uid 101); /etc/nginx é gravável pelo
# uid 101 (chown no Dockerfile). Logs do entrypoint vão para stderr.
# ===========================================================================
set -eu

# CSP configurável por env (default 'self' — ver docs/runbook-deploy.md).
# Export OBRIGATÓRIO: o envsubst é um processo externo e só vê variáveis de
# ambiente exportadas. Sem export, docker run direto (sem compose) renderizava
# `default-src ;` vazio (QA, bug de média severidade).
export CSP_DEFAULT_SRC="${CSP_DEFAULT_SRC:-self}"

echo "[entrypoint] CSP_DEFAULT_SRC=${CSP_DEFAULT_SRC}" >&2

render_security_headers() {
    envsubst '${CSP_DEFAULT_SRC}' \
        < /etc/nginx/security-headers.conf.template \
        > /etc/nginx/conf.d/security-headers.conf
}

TLS=0
if [ -f /etc/nginx/certs/fullchain.pem ] && [ -f /etc/nginx/certs/privkey.pem ]; then
    TLS=1
fi

render_security_headers

if [ "$TLS" = "1" ]; then
    cp /etc/nginx/nginx.ssl.conf.template /etc/nginx/nginx.conf

    # HSTS apenas após validação completa de HTTPS + subdomínios (ver runbook).
    # `preload` é OPT-IN via HSTS_PRELOAD=1: o runbook (secção 8.2) manda
    # confirmar a política de subdomínios antes de pedir inclusão na lista
    # HSTS preload (QA, bug de baixa severidade).
    if [ "${HSTS_ENABLED:-0}" = "1" ]; then
        HSTS_MAX_AGE="${HSTS_MAX_AGE:-31536000}"
        HSTS_HEADER="max-age=${HSTS_MAX_AGE}; includeSubDomains"
        if [ "${HSTS_PRELOAD:-0}" = "1" ]; then
            HSTS_HEADER="${HSTS_HEADER}; preload"
        fi
        printf 'add_header Strict-Transport-Security "%s" always;\n' "${HSTS_HEADER}" >> /etc/nginx/conf.d/security-headers.conf
        echo "[entrypoint] HSTS ativo (${HSTS_HEADER})." >&2
    else
        echo "[entrypoint] HSTS desativado (HSTS_ENABLED=1 para ativar após validação)." >&2
    fi

    echo "[entrypoint] Certificados encontrados: HTTPS na origem (8443) + redirect HTTP->HTTPS (8080)." >&2
else
    cp /etc/nginx/nginx.conf.template /etc/nginx/nginx.conf
    echo "[entrypoint] Sem certificados em /etc/nginx/certs: servindo apenas HTTP (8080)." >&2
    echo "[entrypoint] Monte fullchain.pem + privkey.pem (Cloudflare Origin CA) para ativar TLS — docs/runbook-deploy.md." >&2
fi

exec "$@"
