FROM node:18-slim as base

RUN ["adduser",  "--home",  "/usr/src/app", "--system", "sandboxuser"]
RUN ["chown", "-R", "sandboxuser", "/usr/src/app"]
RUN ["chmod", "-R", "u+rwx", "/usr/src/app"]

ENV OUTPUT_PATH ./output.txt

WORKDIR /usr/src/app
COPY . .
RUN npm install

RUN apt-get update \
    && apt-get install default-jre -y \
    && apt-get install default-jdk -y

CMD ["node", "index.js"]