FROM node:18.14-bullseye-slim
WORKDIR /home/node/app

COPY . .

RUN yarn install:all

ENV NODE_ENV=production

RUN yarn build

CMD ["yarn", "start:manager:ci"]
