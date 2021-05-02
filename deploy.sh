#!/bin/bash
set -e

if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "NETLIFY_AUTH_TOKEN not setted"
    exit 1
fi

if [ -z "$NETLIFY_SITE_ID" ]; then
    echo "NETLIFY_SITE_ID not setted"
    exit 1
fi

args=(
    --message="@$(git rev-parse --short HEAD)"
    --auth=""
    --site=""
    --dir=public
)

if [[ "$DRONE_BRANCH" = main ]]; then
    args+=(--prod)
fi
  
npx netlify deploy "${args[@]}"
