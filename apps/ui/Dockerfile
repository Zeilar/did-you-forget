FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY . .

COPY apps/ui/.env .

RUN yarn install --frozen-lockfile

RUN npx nx build ui --prod

COPY dist/apps/ui ui

FROM node:alpine as main

COPY --from=build /usr/src/app/ui .

RUN yarn install --frozen-lockfile

EXPOSE 4025

CMD ["npm", "start", "--", "-p", "4025"]
