const { gql } = require('apollo-server');

const typeDefs = gql`
    type Manga {
        id: Int!
        title: String!
        team: String
        cover_checksum: String
        cover_path: String
    }
    type Chapter {
        id: Int!
        number: Int!
        title: String!
        url: String!
        date: Date
        manga_id: Int!
    }
`;

module.exports.typeDefs = typeDefs;