FROM node:latest
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
VOLUME [ "/databases" ]
EXPOSE 443
CMD [ "node", "server.js" ]
