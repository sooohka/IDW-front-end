FROM node:16

WORKDIR /usr/share/app

COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn","serve"]

