#!/bin/bash

git pull
docker-compose down
docker-compose build
docker system prune -f