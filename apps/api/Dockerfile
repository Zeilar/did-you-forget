FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn global add prisma

RUN yarn prisma generate --schema apps/api/prisma/schema.prisma

RUN yarn nx build api

FROM node:22-alpine as main

COPY --from=build /usr/src/app/dist/apps/api .
COPY --from=build /usr/src/app/apps/api/.env .
COPY --from=build /usr/src/app/apps/api/prisma .

# Prisma needs it for some reason, in order to connect to the database.
RUN apk add openssl

RUN yarn install --frozen-lockfile

RUN yarn prisma generate

# Is needed in runtime for some reason.
RUN yarn add tslib

EXPOSE 4020

CMD ["node", "main.js"]
