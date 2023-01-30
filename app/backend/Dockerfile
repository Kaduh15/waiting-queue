FROM node:16-alpine

WORKDIR /usr/app-back

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "npm" ]
CMD [ "run", "start:prod" ]