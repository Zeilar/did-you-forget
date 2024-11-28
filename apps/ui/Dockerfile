FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn nx prisma-generate api

# Verify Nx CLI version
RUN yarn nx --version

# Build the app with detailed logs
RUN yarn nx build ui --debug

# RUN npx nx build ui

FROM node:alpine as main

COPY --from=build /usr/src/app/dist/apps/ui .

RUN yarn install --frozen-lockfile

EXPOSE 4025

CMD ["yarn", "start", "--", "-p", "4025"]
