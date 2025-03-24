FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "dev"]