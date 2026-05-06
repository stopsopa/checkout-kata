
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

ENVFILE="${ENVFILE:-.env}"

if [[ -f "${DIR}/${ENVFILE}" ]]; then
    eval "$(/bin/bash "${DIR}/bash/exportsource.sh" "${DIR}/${ENVFILE}")"
fi

source "${DIR}/bash/require_non_empty_var.sh"

# -----------------------------------------------------------------------------
# Validation
# -----------------------------------------------------------------------------

require_non_empty_var "${0}" "PROJECT_NAME"

require_non_empty_and_matching_var "${0}" "PORT" "^[0-9]+$"

require_non_empty_var "${0}" "HOST"

require_non_empty_var "${0}" "PG_DB"
require_non_empty_var "${0}" "PG_SCHEMA"
require_non_empty_var "${0}" "PG_HOST"
require_non_empty_var "${0}" "PG_PORT" "^[0-9]+$"
require_non_empty_var "${0}" "PG_USER"
require_non_empty_var "${0}" "PG_PASS"

require_non_empty_var "${0}" "PGA_PMADB_PORT" "^[0-9]+$"