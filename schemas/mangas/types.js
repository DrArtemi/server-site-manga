const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Team {
        id: Int
        name: String
        langage: String
        url: String
        mangas: [Manga]
        chapters: [Chapter]
    }
    type Manga {
        id: Int
        title: String
        url: String
        cover_checksum: String
        cover_path: String
        cover_url: String
        chapters: [Chapter]
        teams: [Team]
        users: [User]
    }
    type Chapter {
        id: Int
        number: String
        title: String
        url: String
        date: Date
        manga_id: Int
        manga: Manga
        teams: [Team]
    }
`;

module.exports.typeDefs = typeDefs;