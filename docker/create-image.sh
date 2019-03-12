#!/usr/bin/env sh

# Copy SSH keys for Docker builder to pull code from private repositories.
\cp -Rf ~/.ssh ./.ssh

docker build -t gennovative/jpworld-admin-web:1.0.0 -t gennovative/jpworld-admin-web:latest -f ./Dockerfile ..

\rm -rf ./.ssh
