#!/usr/bin/env bash
docker run -p 3306:3306 -e MYSQL_USER=jod -e MYSQL_PASSWORD=jod -e MYSQL_DATABASE=jod -e MYSQL_ROOT_PASSWORD=root mysql:5.7