FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN npx nx prisma-generate api

RUN npx nx build api

FROM node:alpine as main

COPY --from=build /usr/src/app/dist/apps/api .
COPY --from=build /usr/src/app/apps/api/.env .
COPY --from=build /usr/src/app/apps/api/prisma .

# RUN yarn add -g dotenv-cli

EXPOSE 4020

# Running migrations here mean that they should happen after the db container is ready.
# If this stops being the case, it must happen in runtime instead.
CMD npx prisma migrate deploy && node main.js
# CMD yarn prisma migrate deploy && dotenv -e .env -- node main.js

