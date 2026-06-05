#!/usr/bin/env bash
set -euo pipefail

remote_host="kontakt@templaro.com"
remote_path="/home/kontakt/apps/top/games/lotoroute"
deploy_url="https://templaro.com/games/lotoroute/"

npm run build:templaro

ssh "${remote_host}" "mkdir -p '${remote_path}'"
rsync -avz --delete dist/ "${remote_host}:${remote_path}/"

printf 'Deployed Lotoroute to %s\n' "${deploy_url}"
