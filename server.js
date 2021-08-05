const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { typeDefs, resolvers } = require('./schema');
require('dotenv').config()


const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET)
    }
    return null
  } catch (error) {
    return null
  }
}

const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.get('Authorization') || ''
        return { user: getUser(token.replace('Bearer', ''))}
    },
    introspection: true,
    playground: true
});

server.listen({ port: process.env.PORT || 8000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});