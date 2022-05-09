FROM node:18.1.0-alpine3.14

RUN mkdir -p /src
WORKDIR /src

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev"]

EXPOSE 3000