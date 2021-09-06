FROM node:14-slim

RUN mkdir -p /usr/src/app
RUN chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

USER node

RUN npm ci

COPY . .

RUN ls -l

EXPOSE 3000

CMD [ "npm", "start:prod" ]