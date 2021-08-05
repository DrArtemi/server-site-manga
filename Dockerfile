FROM node:latest
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
VOLUME [ "/databases" ]
EXPOSE 8000
CMD [ "node", "server.js" ]
