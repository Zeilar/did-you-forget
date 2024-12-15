FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx prisma-generate api

RUN yarn global add nx@19.8.10

RUN nx build api

FROM node:22-alpine as main

COPY --from=build /usr/src/app/dist/apps/api .
COPY --from=build /usr/src/app/apps/api/.env .
COPY --from=build /usr/src/app/apps/api/prisma .

RUN yarn global add nx@19.8.10 prisma@5.22.0

RUN yarn nx prisma-generate api

# Is needed in runtime for some reason.
RUN yarn add tslib

# Prisma needs it for some reason, in order to connect to the database.
RUN apk add openssl

EXPOSE 4020

# Running migrations here mean that they should happen after the db container is ready.
# If this stops being the case, it must happen in runtime instead.
CMD prisma migrate deploy && node main.js
