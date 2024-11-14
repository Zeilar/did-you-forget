FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY apps/api/prisma .

COPY apps/api/.env .

COPY dist/apps/api .

RUN yarn

RUN npx prisma generate

FROM node:alpine as main

COPY --from=build /usr/src/app .

EXPOSE 4000

# Running migrations here mean that they should happen after the db container is ready.
CMD npx prisma migrate deploy && node main.js
