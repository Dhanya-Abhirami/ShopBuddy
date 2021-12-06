FROM node:17.2.0-alpine3.14

RUN mkdir -p /src
WORKDIR /src

COPY ./ ./

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 3000