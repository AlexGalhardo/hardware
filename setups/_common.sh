#!/usr/bin/env bash
# Shared by the setup scripts. Source it; do not run it.

MIN_BUN="1.3.0"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE="docker compose -f infra/docker-compose.yml"

log() { printf '\n==> %s\n' "$*"; }
warn() { printf 'AVISO: %s\n' "$*" >&2; }
fail() {
	printf '\nERRO: %s\n' "$*" >&2
	exit 1
}

# version_ge A B: true when A >= B (dotted numbers).
version_ge() {
	[ "$(printf '%s\n%s\n' "$2" "$1" | sort -t. -k1,1n -k2,2n -k3,3n | head -n1)" = "$2" ]
}

require_bun() {
	command -v bun >/dev/null 2>&1 || fail "Bun não encontrado. Instale em https://bun.sh/docs/installation e abra um terminal novo."
	local version
	version="$(bun --version)"
	version_ge "$version" "$MIN_BUN" || fail "Bun $version é antigo demais. Atualize para $MIN_BUN ou mais novo com: bun upgrade"
	echo "Bun $version"
}

require_docker() {
	command -v docker >/dev/null 2>&1 || fail "Docker não encontrado. Instale o Docker Desktop: https://docs.docker.com/get-docker/"
	docker compose version >/dev/null 2>&1 || fail "Plugin docker compose não encontrado. Atualize o Docker Desktop ou instale o Compose v2."
	docker info >/dev/null 2>&1 || fail "O Docker está instalado mas o daemon não responde. Abra o Docker Desktop e tente de novo."
	echo "Docker $(docker version --format "{{.Server.Version}}")"
}

random_secret() {
	if command -v openssl >/dev/null 2>&1; then
		openssl rand -base64 32
	else
		bun -e "console.log(require(\"node:crypto\").randomBytes(32).toString(\"base64\"))"
	fi
}

# set_if_empty NAME VALUE: writes NAME=VALUE to .env only when NAME is missing or empty. Never prints the value.
set_if_empty() {
	local name="$1" value="$2" file="$ROOT/.env" tmp line
	if grep -qE "^${name}=.+" "$file"; then return 0; fi
	if grep -qE "^${name}=" "$file"; then
		tmp="$(mktemp)"
		while IFS= read -r line || [ -n "$line" ]; do
			if [ "${line%%=*}" = "$name" ]; then printf '%s=%s\n' "$name" "$value"; else printf '%s\n' "$line"; fi
		done <"$file" >"$tmp"
		cat "$tmp" >"$file"
		rm -f "$tmp"
	else
		printf '%s=%s\n' "$name" "$value" >>"$file"
	fi
	echo "  $name preenchido em .env"
}

ensure_env() {
	local port="$1"
	if [ ! -f "$ROOT/.env" ]; then
		[ -f "$ROOT/.env.example" ] || fail ".env.example não existe: o repositório está incompleto."
		cp "$ROOT/.env.example" "$ROOT/.env"
		echo "  .env criado a partir de .env.example"
	else
		echo "  .env já existe: valores atuais mantidos"
	fi
	set_if_empty BETTER_AUTH_SECRET "$(random_secret)"
	set_if_empty BETTER_AUTH_URL "http://localhost:${port}"
}

# True when something already listens on the port.
port_in_use() {
	bun -e "const s=require(\"node:net\").createServer();s.once(\"error\",()=>process.exit(0));s.once(\"listening\",()=>s.close(()=>process.exit(1)));s.listen($1,\"127.0.0.1\")" 2>/dev/null
}

# pick_port PREFERRED: prints PREFERRED, or the next free port (up to +20). Fails when none is free.
pick_port() {
	local port="$1" last=$(($1 + 20))
	while [ "$port" -le "$last" ]; do
		if ! port_in_use "$port"; then
			echo "$port"
			return 0
		fi
		port=$((port + 1))
	done
	fail "Nenhuma porta livre entre $1 e $last. Defina PORT=<porta> e rode de novo."
}

wait_for_http() {
	local url="$1" tries="${2:-45}"
	while [ "$tries" -gt 0 ]; do
		if bun -e "fetch(\"$url\").then(r=>process.exit(r.status<500?0:1)).catch(()=>process.exit(1))" 2>/dev/null; then return 0; fi
		tries=$((tries - 1))
		sleep 2
	done
	return 1
}

require_git_bash() {
	case "$(uname -s)" in
	MINGW* | MSYS* | CYGWIN*) ;;
	*) fail "Este script é para o Git Bash no Windows. Em macOS, Linux ou WSL use o setup-unix-*.sh correspondente." ;;
	esac
}

require_unix() {
	case "$(uname -s)" in
	MINGW* | MSYS* | CYGWIN*) fail "Este script é para macOS, Linux ou WSL. No Windows (Git Bash) use o setup-windows-*.sh correspondente." ;;
	esac
}

local_setup() {
	cd "$ROOT"
	log "Ferramentas"
	require_bun
	log "Dependências"
	bun install --frozen-lockfile || fail "bun install falhou. Apague node_modules e rode de novo; se persistir, confira a rede."
	local wanted="${PORT:-3000}" port
	port="$(pick_port "$wanted")"
	[ "$port" = "$wanted" ] || warn "Porta $wanted ocupada: usando $port."
	log "Variáveis de ambiente"
	ensure_env "$port"
	if [ "${SKIP_CHECKS:-0}" != "1" ]; then
		log "Verificação: tipos e testes (pule com SKIP_CHECKS=1)"
		bun run typecheck || fail "Erros de tipo. Corrija antes de continuar."
		bun run test || fail "Testes falharam."
	fi
	if [ "${NO_START:-0}" = "1" ]; then
		log "Pronto. Suba com: bun run dev -- --port $port"
		return 0
	fi
	log "Servidor de desenvolvimento em http://localhost:$port (Ctrl+C para parar)"
	bun run dev -- --port "$port"
}

docker_setup() {
	cd "$ROOT"
	log "Ferramentas"
	require_docker
	require_bun
	local wanted="${PORT:-3000}" port
	port="$(pick_port "$wanted")"
	[ "$port" = "$wanted" ] || warn "Porta $wanted ocupada: usando $port."
	log "Variáveis de ambiente"
	ensure_env "$port"
	log "Imagem (infra/Dockerfile)"
	PORT="$port" $COMPOSE build || fail "O build da imagem falhou. Veja o erro acima."
	if [ "${NO_START:-0}" = "1" ]; then
		log "Imagem pronta. Suba com: PORT=$port $COMPOSE up -d"
		return 0
	fi
	log "Container"
	PORT="$port" $COMPOSE up -d || fail "O container não subiu."
	if wait_for_http "http://localhost:$port/"; then
		log "No ar em http://localhost:$port (logs: $COMPOSE logs -f | parar: $COMPOSE down)"
	else
		$COMPOSE logs --tail 40 || true
		fail "O container subiu mas http://localhost:$port não respondeu em 90s. Veja os logs acima."
	fi
}
