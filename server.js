// const { express } = require('express');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const jwt = require('jsonwebtoken');
const { typeDefs, resolvers } = require('./schema');
const https = require('https');
const http = require('http');
const fs = require('fs');
require('dotenv').config()

async function startApolloServer() {
  const configurations = {
    production: { ssl: true, port: 8443, hostname: 'localhost' },
    development: { ssl: false, port: process.env.PORT || 8000, hostname: 'localhost' },
  };
  const environment = process.env.NODE_ENV || 'production';
  const config = configurations[environment];


  const getUser = token => {
    try {
      console.log(token);
      if (token) {
        //! This is a quick and dirty fix to a bug where token is
        //! received 2 times separated by a comma on some browsers...
        if (token.includes(','))
          token = token.split(',')[1].trim()
        return jwt.verify(token, process.env.JWT_SECRET)
      }
      console.log('Out token !')
      return null
    } catch (error) {
      console.log('Error token !', error)
      return null
    }
  }

  const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
          const token = req.get('Authorization') || ''
          return { user: getUser(token.replace('Bearer', ''))}
      },
      introspection: true,
      playground: true
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app, path:'/' });

  let httpServer;
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        key: fs.readFileSync(`/etc/nginx/ssl/fuckjapscan-key.pem`),
        cert: fs.readFileSync(`/etc/nginx/ssl/fuckjapscan-cert.pem`)
      },
      app,
    );
  } else {
    httpServer = http.createServer(app);
  }

  await new Promise(resolve => httpServer.listen({ port: config.port }, resolve));
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}`
  );

  return { server, app };
}

startApolloServer();
