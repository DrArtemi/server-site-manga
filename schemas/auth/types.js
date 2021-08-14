const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: Int!
        pseudo: String
        email: String!
        mangas: [Manga]
    }
    type AuthPayload {
        token: String!
        status: String!
        message: String!
    }
    type LikePayload {
        success: Boolean!
        message: String!
    }
`;

module.exports.typeDefs = typeDefs;