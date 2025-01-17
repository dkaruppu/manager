FROM node:18.14-alpine AS builder

WORKDIR /home/node/app

COPY . .

RUN yarn install:all

# ENV NODE_ENV=development

RUN yarn workspace @linode/validation build \
    && yarn workspace @linode/api-v4 build

RUN yarn workspace linode-manager build

FROM nginxinc/nginx-unprivileged:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./packages/manager/build /var/www/html/linode-cloud 
COPY ./nginx.manager.conf /etc/nginx/sites-enabled/cloud1.linode.com
COPY ./nginx.manager.default.conf /etc/nginx/nginx.conf

EXPOSE 8080

# CMD ["nginx", "-g", "daemon off;"]
# CMD ["yarn", "start:manager:ci"]
