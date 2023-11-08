FROM node:18-slim as base

RUN ["adduser",  "--home",  "/usr/src/app", "--system", "sandboxuser"]
RUN ["chown", "-R", "sandboxuser", "/usr/src/app"]
RUN ["chmod", "-R", "u+rwx", "/usr/src/app"]

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD ["node", "index.js"]