#!/bin/bash
export USER_ID=$(id -u);
export GROUP_ID=$(id -g);

# check if .env file exists
# FILE=.env;
# env_exists=false;
# if test -f "$FILE"
# then
#     echo "Found env file.";
#     env_exists=true;
#     source .env
# fi

echo "Starting count.ly Server!"
cd Server
docker container stop $(docker container ls -aq)
# docker rm $(docker ps -a -q)

docker-compose -f docker-compose.yml build && COUNTLY_CONFIG_HOSTNAME='localhost' docker-compose -f docker-compose.yml up