#!/bin/sh

if [ "$1" = "dev" ]; then 
  /wait && yarn dev
else
  /wait && yarn start
fi;