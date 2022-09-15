FROM node:12-alpine
# ENV NODE_ENV "production"
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000


CMD ["npm", "run" , "start"]

