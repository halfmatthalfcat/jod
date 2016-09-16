FROM ubuntu:trusty
MAINTAINER "Matt Oliver <mjo2089@gmail.com>"
WORKDIR /opt
ADD . .
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-qqy", "nodejs", "nodejs-legacy", "npm", "mysql-client"]
RUN ["npm", "install", "-g", "typescript", "gulp", "typings", "ntsc", "webpack"]
RUN ["typings", "install"]
RUN ["npm", "install"]
RUN ["npm", "run", "build"]
ENTRYPOINT ["node", "server.js"]