FROM node:alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install && npm run build

FROM flashspys/nginx-static
ENTRYPOINT ["/entrypoint.sh"]
RUN apk update && apk upgrade
COPY --from=0 /usr/src/app/dist /static
COPY entrypoint.sh /
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
