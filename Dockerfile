FROM node:10.0

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

CMD ["node", "--require", "babel-core/register", "./index.js"]