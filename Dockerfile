FROM node:14.18.1-alpine
# FROM python:3.9.0.1-alpine

WORKDIR /

ARG REACT_APP_GA_TRACKING_ID

# Dependencies
COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages/client/package.json ./packages/client/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN yarn

# Files
COPY . .

# Build
RUN yarn build

# Port
EXPOSE 3001

# Serve
CMD [ "yarn", "serve" ]
