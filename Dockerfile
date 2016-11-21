FROM ubuntu:trusty
MAINTAINER "Matt Oliver <mjo2089@gmail.com>"
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-qqy", "nodejs", "nodejs-legacy", "npm", "curl"]
RUN ["npm", "install", "-g", "n"]
RUN ["n", "stable"]
RUN ["npm", "install", "-g", "typings"]
WORKDIR /opt
ADD . .
RUN ["npm", "install"]
RUN ["typings", "install"]
RUN ["npm", "run", "build"]
WORKDIR /opt/backend
ENTRYPOINT ["node", "server.js"]
