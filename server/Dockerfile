FROM node:12-alpine
WORKDIR /usr/server
COPY . .
RUN npm install && npm install nodemon
EXPOSE 3000
CMD ["npm", "run" , "dev"]
