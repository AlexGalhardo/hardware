#!/usr/bin/env bash
# Constrói a imagem (infra/Dockerfile) e sobe o projeto em Docker (macOS, Linux, WSL).
# Opcionais: PORT=<porta>, NO_START=1 (só constrói a imagem).
set -euo pipefail
# shellcheck source=setups/_common.sh
source "$(dirname "${BASH_SOURCE[0]}")/_common.sh"
require_unix
docker_setup
