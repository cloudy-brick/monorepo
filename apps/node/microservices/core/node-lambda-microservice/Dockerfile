FROM node:14.5-alpine as building
WORKDIR /app_building
COPY ./apps ./apps
COPY ./libs ./libs
COPY ./tools ./tools
COPY ./package.json ./
COPY ./*.json ./
COPY ./*.js ./

RUN npm i
RUN npx nx build node-microservices-core-node-lambda-microservice

FROM node:14.5-alpine
WORKDIR /app
COPY --from=building /app_building/dist/apps/node/microservices/core/node-lambda-microservice/ ./
RUN npm i
CMD [ "node","main.js" ]