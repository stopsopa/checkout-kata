
#
# script is here to assist running docker/podman compose and run all env var validation before
#

_SHELL="$(ps "${$}" | grep "${$} " | grep -v grep | sed -rn "s/.*[-\/]+(bash|z?sh) .*/\1/p")"; # bash || sh || zsh
case ${_SHELL} in
  zsh)
    _DIR="$( cd "$( dirname "${(%):-%N}" )" && pwd -P )"
    _SCRIPT="${(%):-%N}"
    _BINARY="/bin/zsh"
    _PWD="$(pwd)"
    ;;
  sh)
    _DIR="$( cd "$( dirname "${0}" )" && pwd -P )"
    _SCRIPT="${0}"
    _BINARY="/bin/sh"
    _PWD="$(pwd)"
    ;;
  *)
    _DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
    _SCRIPT="${BASH_SOURCE[0]}"
    _BINARY="/bin/bash"
    _PWD="$(pwd)"
    ;;
esac

_ROOT="$(cd "${_DIR}/.." && pwd)"

source "${_ROOT}/.env.sh"

if command -v docker >/dev/null 2>&1; then
    _DOCKER="docker"
elif command -v podman >/dev/null 2>&1; then
    _DOCKER="podman"
else
    echo "Error: neither docker nor podman found in PATH"
    exit 1
fi


ENV="${_DIR}/../.env"

if [ ! -f "${ENV}" ]; then

  echo "${0} error: ${ENV} doesn't exist"

  exit 1
fi

if [ "${1}" = "up" ]; then

    set -e

    ${_DOCKER} compose --env-file "${ENV}" -f "${_DIR}/docker-compose.yml" up -d

    set +x

    ${_DOCKER} ps | grep "${PROJECT_NAME}"

#     CONTAINER="${PROJECT_NAME}_pgadmin"

#     printf "Waiting for pgAdmin to be ready: ";
#     until [ "$(${_DOCKER} inspect -f '{{.State.Health.Status}}' ${CONTAINER})" = "healthy" ]; do
#         printf "."
#         sleep 2;
#     done;
#     echo " Ready!"

# cat << EOF

#   all good

#   visit:

#     pgAdmin (Postgres): http://0.0.0.0:${PGA_PMADB_PORT}

# EOF

    exit 0;
fi

if [ "${1}" = "down" ]; then

    ${_DOCKER} compose --env-file "${ENV}" -f "${_DIR}/docker-compose.yml" down
#    ${_DOCKER} compose -f "${TMP}" down

    ${_DOCKER} ps | grep "${PROJECT_NAME}"

    exit 0;
fi

cat << EOF

# script is here to assist running docker/podman compose and run all env var validation before

  # to run container
  /bin/bash ${0} up

  # to stop container
  /bin/bash ${0} down

EOF