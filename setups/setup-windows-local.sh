#!/usr/bin/env bash
# Prepara e sobe o projeto direto na máquina, pelo Git Bash no Windows.
# Opcionais: PORT=<porta>, NO_START=1 (prepara e não sobe), SKIP_CHECKS=1 (pula tipos e testes).
set -euo pipefail
# shellcheck source=setups/_common.sh
source "$(dirname "${BASH_SOURCE[0]}")/_common.sh"
require_git_bash
local_setup
