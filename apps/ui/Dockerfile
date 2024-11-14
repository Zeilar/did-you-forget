FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY apps/ui/.env .

COPY dist/apps/ui .

RUN yarn

FROM node:alpine as main

COPY --from=build /usr/src/app .

EXPOSE 3000

CMD ["npm", "start"]
