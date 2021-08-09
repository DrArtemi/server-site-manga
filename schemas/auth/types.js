const { gql } = require('apollo-server-express');

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
`;

module.exports.typeDefs = typeDefs;