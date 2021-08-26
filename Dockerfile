FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -l

EXPOSE 3000

CMD [ "npm", "run", "dev" ]