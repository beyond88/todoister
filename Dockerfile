FROM node

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . . /

EXPORE 4444

CMD ["npm", "start"]
