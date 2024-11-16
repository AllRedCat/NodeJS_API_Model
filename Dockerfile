FROM node:14
LABEL authors="gabriel"

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "/index.js"]