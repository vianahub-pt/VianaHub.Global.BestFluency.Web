#!/usr/bin/env bash
# ===========================================================================
# deploy.sh — Deploy reproduzível da landing Best Fluency (VPS Hostinger).
#
# Fluxo: build local (npm + docker) -> save/upload da imagem via scp ->
#        backup da configuração e da imagem anterior no servidor ->
#        load + swap do container (docker compose) -> validação pós-deploy.
#
# NENHUM valor real está hardcoded: servidor, utilizador, caminho e domínio
# vêm de variáveis de ambiente (ou de um .env local, nunca versionado).
#
# Uso:
#   SERVER_HOST=<...> SERVER_USER=<...> REMOTE_PATH=<...> DOMAIN=<...> \
#       IMAGE_TAG=<tag> ./scripts/deploy.sh
#
# Opções:
#   --skip-build     reutiliza a imagem já construída localmente
#   --rollback       faz rollback para o backup anterior no servidor
#   --validate-only  apenas valida o deploy atualmente em produção
#   --dry-run        mostra os passos sem executar alterações remotas
#   --no-validate    não executa a validação pós-deploy
#
# Variáveis de ambiente (sem valores reais no repo — ver docs/runbook-deploy.md):
#   SERVER_HOST   IP/domínio da VPS Hostinger (obrigatória)
#   SERVER_USER   utilizador SSH na VPS (obrigatória)
#   REMOTE_PATH   diretório do stack no servidor, ex.: /opt/best-fluency (obrigatória)
#   DOMAIN        domínio público da landing, ex.: www.exemplo.pt (obrigatória)
#   IMAGE_TAG     tag da imagem (default: git rev-parse --short HEAD)
#   SSH_PORT      porta SSH (default: 22)
#   NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_SITE_INDEXABLE /
#   NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN   argumentos de build da imagem
#   CSP_DEFAULT_SRC / HSTS_ENABLED / HSTS_MAX_AGE   runtime do container
#   ORIGIN_CHECK_URL   URL alternativa para validação pós-deploy (ex.: o IP
#                      direto da origem antes do DNS/Cloudflare estar pronto)
# ===========================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# Configuração a partir do ambiente (nunca hardcoded).
# ---------------------------------------------------------------------------
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SSH_PORT="${SSH_PORT:-22}"
IMAGE_TAG="${IMAGE_TAG:-$(git -C "${BASE_DIR}" rev-parse --short HEAD)}"
IMAGE_NAME="best-fluency-web"
IMAGE_REF="${IMAGE_NAME}:${IMAGE_TAG}"
COMPOSE_FILE="docker-compose.yml"

# Carga opcional de um .env local (gitignored — nunca versionado).
if [ -f "${BASE_DIR}/.env" ]; then
  # shellcheck disable=SC1091
  set -a && . "${BASE_DIR}/.env" && set +a
fi

MODE="deploy"
SKIP_BUILD=0
DO_VALIDATE=1
DRY_RUN=0
while [ $# -gt 0 ]; do
  case "$1" in
    --skip-build) SKIP_BUILD=1 ;;
    --rollback) MODE="rollback" ;;
    --validate-only) MODE="validate-only" ;;
    --dry-run) DRY_RUN=1 ;;
    --no-validate) DO_VALIDATE=0 ;;
    -h|--help)
      grep '^#' "$0" | sed 's/^# \{0,1\}//' | head -n 60
      exit 0
      ;;
    *) echo "ERRO: opção desconhecida: $1" >&2; exit 2 ;;
  esac
  shift
done

# ---------------------------------------------------------------------------
# Pré-requisitos
# ---------------------------------------------------------------------------
require_var() {
  local name="$1"
  if [ -z "${!name:-}" ]; then
    echo "ERRO: variável obrigatória não definida: ${name}" >&2
    echo "      (defina em ambiente ou num .env local — docs/runbook-deploy.md)" >&2
    exit 1
  fi
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "ERRO: comando não encontrado: $1" >&2; exit 1
  }
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
ssh_run() {
  ssh -p "${SSH_PORT}" -o StrictHostKeyChecking=accept-new \
    "${SERVER_USER}@${SERVER_HOST}" "$@"
}

log() { echo "[deploy] $*"; }
log_step() { echo; echo "==> $*"; }

# ---------------------------------------------------------------------------
# 1) Build local
# ---------------------------------------------------------------------------
build_local() {
  if [ "${SKIP_BUILD}" = "1" ]; then
    log "SKIP_BUILD: a reutilizar a imagem local ${IMAGE_REF} (se existir)."
    return
  fi
  log_step "Build estático local (npm ci + lint + typecheck + build)"
  (cd "${BASE_DIR}" \
    && npm ci --no-audit --no-fund \
    && npm run lint \
    && npm run typecheck \
    && npm run build)

  log_step "Build da imagem Docker (${IMAGE_REF})"
  docker build \
    --build-arg "NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}" \
    --build-arg "NEXT_PUBLIC_SITE_INDEXABLE=${NEXT_PUBLIC_SITE_INDEXABLE:-false}" \
    --build-arg "NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=${NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN:-}" \
    -t "${IMAGE_REF}" \
    -f "${BASE_DIR}/Dockerfile" \
    "${BASE_DIR}"
}

# ---------------------------------------------------------------------------
# 2) Upload da imagem e do compose
# ---------------------------------------------------------------------------
upload_artifacts() {
  local tarball
  tarball="$(mktemp -t best-fluency-web-XXXXXX.tar.gz)"

  log_step "Save + upload da imagem (${IMAGE_REF}) para ${SERVER_USER}@${SERVER_HOST}"
  if [ "${DRY_RUN}" = "1" ]; then
    log "[dry-run] docker save ${IMAGE_REF} | gzip -> ${tarball} -> scp para o servidor"
  else
    docker save "${IMAGE_REF}" | gzip -1 > "${tarball}"
    scp -P "${SSH_PORT}" -o StrictHostKeyChecking=accept-new \
      "${tarball}" "${SERVER_USER}@${SERVER_HOST}:/tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar.gz"
  fi

  log_step "Upload do docker-compose.yml (fonte única de verdade da configuração)"
  if [ "${DRY_RUN}" = "1" ]; then
    log "[dry-run] scp ${COMPOSE_FILE} -> ${SERVER_USER}@${SERVER_HOST}:${REMOTE_PATH}/${COMPOSE_FILE}"
  else
    ssh_run "mkdir -p '${REMOTE_PATH}'"
    scp -P "${SSH_PORT}" -o StrictHostKeyChecking=accept-new \
      "${BASE_DIR}/${COMPOSE_FILE}" \
      "${SERVER_USER}@${SERVER_HOST}:${REMOTE_PATH}/${COMPOSE_FILE}"
  fi

  rm -f "${tarball}"
}

# ---------------------------------------------------------------------------
# 3) Deploy remoto com backup (configuração + imagem anterior)
# ---------------------------------------------------------------------------
remote_deploy() {
  local ts
  ts="$(date +%Y%m%d%H%M%S)"
  local backup_dir="${REMOTE_PATH}/backups/${ts}"

  log_step "Backup da configuração e da imagem em execução (${backup_dir})"
  if [ "${DRY_RUN}" = "1" ]; then
    log "[dry-run] mkdir -p ${backup_dir}; copiar compose/.env; docker save da imagem atual"
    return
  fi

  ssh_run "
    set -eu
    mkdir -p '${backup_dir}'
    if [ -f '${REMOTE_PATH}/${COMPOSE_FILE}' ]; then
      cp '${REMOTE_PATH}/${COMPOSE_FILE}' '${backup_dir}/'
    fi
    if [ -f '${REMOTE_PATH}/.env' ]; then
      cp '${REMOTE_PATH}/.env' '${backup_dir}/' || true
    fi
    # Backup da imagem atualmente em execução (para rollback imediato).
    if docker ps --format '{{.Names}}' | grep -q '^${IMAGE_NAME}\$'; then
      current=\$(docker inspect --format '{{.Image}}' '${IMAGE_NAME}')
      docker save \"\${current}\" | gzip -1 > '${backup_dir}/image-previous.tar.gz'
    fi
  "

  log_step "Load da nova imagem + swap do container (docker compose up -d --no-build)"
  if [ "${DRY_RUN}" = "1" ]; then
    log "[dry-run] docker load < /tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar.gz"
    log "[dry-run] cd ${REMOTE_PATH} && docker compose up -d --no-build (IMAGE_TAG=${IMAGE_TAG})"
    return
  fi

  ssh_run "
    set -eu
    docker load -i '/tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar.gz'
    cd '${REMOTE_PATH}'
    IMAGE_TAG='${IMAGE_TAG}' \
    CSP_DEFAULT_SRC=\"\${CSP_DEFAULT_SRC:-'self'}\" \
    HSTS_ENABLED=\"\${HSTS_ENABLED:-0}\" \
    HSTS_MAX_AGE=\"\${HSTS_MAX_AGE:-31536000}\" \
      docker compose up -d --no-build
    docker image prune -f >/dev/null 2>&1 || true
  "
}

# ---------------------------------------------------------------------------
# 4) Rollback (--rollback): restaura o backup anterior
# ---------------------------------------------------------------------------
remote_rollback() {
  require_var REMOTE_PATH
  if [ "${DRY_RUN}" = "1" ]; then
    log "[dry-run] rollback: restaurar image-previous.tar.gz mais recente + compose up"
    return
  fi
  log_step "Rollback: restaura o backup anterior no servidor"
  ssh_run "
    set -eu
    latest=\$(ls -1t '${REMOTE_PATH}/backups' | head -n1)
    backup='${REMOTE_PATH}/backups/\${latest}'
    if [ -f \"\${backup}/image-previous.tar.gz\" ]; then
      docker load -i \"\${backup}/image-previous.tar.gz\"
    fi
    if [ -f \"\${backup}/${COMPOSE_FILE}\" ]; then
      cp \"\${backup}/${COMPOSE_FILE}\" '${REMOTE_PATH}/${COMPOSE_FILE}'
    fi
    cd '${REMOTE_PATH}'
    docker compose up -d --no-build
  "
}

# ---------------------------------------------------------------------------
# 4b) Purge do cache Cloudflare (opcional — só com credenciais reais no env)
# ---------------------------------------------------------------------------
cloudflare_purge() {
  if [ -z "${CF_API_TOKEN:-}" ] || [ -z "${CF_ZONE_ID:-}" ]; then
    log "INFO - CF_API_TOKEN/CF_ZONE_ID não definidos: purge Cloudflare ignorado."
    log "       (ativar no lançamento com as credenciais reais — docs/runbook-deploy.md)"
    return
  fi
  if [ "${DRY_RUN}" = "1" ]; then
    log "[dry-run] POST https://api.cloudflare.com/client/v4/zones/\${CF_ZONE_ID}/purge_cache"
    return
  fi
  log_step "Purge do cache Cloudflare (zona ${CF_ZONE_ID})"
  curl -fsS -X POST \
    "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
    -H "Authorization: Bearer ${CF_API_TOKEN}" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}' \
    >/dev/null \
    && log "Purge Cloudflare concluído."
}

# ---------------------------------------------------------------------------
# 5) Validação pós-deploy
# ---------------------------------------------------------------------------
validate() {
  require_var DOMAIN
  require_cmd curl

  # URL de validação: ORIGIN_CHECK_URL (ex.: IP direto) ou https://DOMAIN.
  local base_url="${ORIGIN_CHECK_URL:-https://${DOMAIN}}"
  log_step "Validação pós-deploy em ${base_url}"

  local fail=0
  check() {
    local label="$1"; shift
    if "$@" >/dev/null 2>&1; then
      log "OK   - ${label}"
    else
      log "FALHA - ${label}"
      fail=1
    fi
  }

  check "healthcheck (${base_url}/healthz responde 200)" \
    curl -fsS -o /dev/null -w '%{http_code}' "${base_url}/healthz" | grep -q '^200$'
  check "página raiz (${base_url}/ responde 200)" \
    curl -fsS -o /dev/null -w '%{http_code}' "${base_url}/" | grep -q '^200$'
  check "conteúdo da raiz contém 'Best Fluency'" \
    curl -fsS "${base_url}/" | grep -qi 'Best Fluency'
  check "locale /en/ responde 200" \
    curl -fsS -o /dev/null -w '%{http_code}' "${base_url}/en/" | grep -q '^200$'

  # Página 404 própria (404.html do export).
  check "rota inexistente responde 404 com página própria" \
    curl -s -o /dev/null -w '%{http_code}' "${base_url}/rota-inexistente-xyz" | grep -q '^404$'

  # Security headers na resposta HTML.
  local html_headers
  html_headers="$(curl -fsSI "${base_url}/" 2>/dev/null || curl -fsSI "${base_url}/index.html" 2>/dev/null || true)"
  check "header Content-Security-Policy presente" \
    grep -qi 'content-security-policy' <<<"${html_headers}"
  check "header X-Content-Type-Options: nosniff presente" \
    grep -qi 'x-content-type-options: nosniff' <<<"${html_headers}"
  check "header Referrer-Policy presente" \
    grep -qi 'referrer-policy' <<<"${html_headers}"

  # Asset com hash: cache longo/immutable + CF-Cache-Status quando atrás do Cloudflare.
  local asset_path
  asset_path="$(curl -fsS "${base_url}/" | grep -o '/_next/static/chunks/[^"]*\.js' | head -n1)"
  if [ -n "${asset_path}" ]; then
    local asset_headers
    asset_headers="$(curl -fsSI "${base_url}${asset_path}")"
    check "asset com hash tem Cache-Control immutable" \
      grep -qi 'cache-control: public, max-age=31536000, immutable' <<<"${asset_headers}"
    if grep -qi '^cf-cache-status:' <<<"${asset_headers}"; then
      log "INFO - CF-Cache-Status do asset: $(grep -i '^cf-cache-status:' <<<"${asset_headers}" | tr -d '\r')"
      check "CF-Cache-Status presente (proxy Cloudflare ativo)" \
        grep -qi '^cf-cache-status:' <<<"${asset_headers}"
    else
      log "INFO - CF-Cache-Status ausente (validação direta à origem / sem proxy)."
    fi
  else
    log "INFO - não foi possível extrair asset hashed da página raiz."
  fi

  # Compressão na origem: Brotli quando o cliente suporta.
  local accept_encoding
  accept_encoding="$(curl -fsSI -H 'Accept-Encoding: br' "${base_url}/_next/static/chunks/$(basename "${asset_path:-_none}")" 2>/dev/null || true)"
  if grep -qi 'content-encoding: br' <<<"${accept_encoding}"; then
    log "OK   - compressão Brotli ativa na origem"
  elif grep -qi 'content-encoding: gzip' <<<"${accept_encoding}"; then
    log "OK   - compressão Gzip ativa na origem (Brotli indisponível para este asset)"
  else
    log "INFO - Content-Encoding não detetado no asset (pode estar fora do tamanho mínimo ou já comprimido)."
  fi

  if [ "${fail}" = "1" ]; then
    echo "[deploy] VALIDAÇÃO FALHOU" >&2
    return 1
  fi
  log "Validação concluída com sucesso."
}

# ---------------------------------------------------------------------------
# Orquestração
# ---------------------------------------------------------------------------
require_cmd docker
require_cmd ssh
require_cmd scp
require_cmd curl

case "${MODE}" in
  rollback)
    require_var SERVER_HOST
    require_var SERVER_USER
    remote_rollback
    ;;
  validate-only)
    validate
    ;;
  deploy)
    require_var SERVER_HOST
    require_var SERVER_USER
    require_var REMOTE_PATH
    build_local
    upload_artifacts
    remote_deploy
    cloudflare_purge
    if [ "${DO_VALIDATE}" = "1" ]; then
      validate
    else
      log "Validação pós-deploy desativada (--no-validate)."
    fi
    ;;
esac

log "Concluído."
