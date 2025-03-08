FROM node:20

WORKDIR /usr/src/app

ARG DB_URL
ENV DB_URL=$DB_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "DB_URL=$DB_URL" > /usr/src/app/.env

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main"]