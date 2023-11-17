FROM node:17-alpine
RUN npm install -g nodemon
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm","run","start"]