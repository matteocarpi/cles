#!/bin/bash

curl --location --request DELETE "https://$DRONE_SYSTEM_HOST/api/repos/$DRONE_REPO/builds/`expr $DRONE_BUILD_NUMBER - 1`" --header "Authorization: Bearer $DRONE_AUTH_TOKEN"
