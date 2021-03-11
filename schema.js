const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: Int!
    pseudo: String
    email: String!
  }
  type AuthPayload {
    token: String!
    status: String!
    message: String!
  }
  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    me: User
  }
  type Mutation {
    registerUser(pseudo: String, email: String!, password: String!): AuthPayload!
    login (email: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs