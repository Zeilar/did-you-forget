FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx prisma-generate api

RUN yarn global add nx@19.8.10

RUN nx build ui

FROM node:22-alpine as main

COPY --from=build /usr/src/app/dist/apps/ui .

RUN yarn install --frozen-lockfile

EXPOSE 4025

CMD ["yarn", "start", "--", "-p", "4025"]
