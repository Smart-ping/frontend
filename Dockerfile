FROM node:alpine

WORKDIR /opt/app

COPY . /opt/app

RUN npm install --only=production && npm run generate

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]