const { gql } = require('apollo-server-express');

const { typeDefs: authTypeDefs } = require('./schemas/auth/types');
const { queries: authQueries } = require('./schemas/auth/queries');
const { mutations: authMutations } = require('./schemas/auth/mutations');

const { typeDefs: mangaTypeDefs } = require('./schemas/mangas/types');
const { queries: mangaQueries } = require('./schemas/mangas/queries');
const { scalars: mangaScalars } = require('./schemas/mangas/scalars');

const typeDefs = gql`
  scalar Date
  
  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    me: User

    manga(id: Int!): Manga
    allMangas(first: Int = 50, searchText: String = "", langage : [String] = [], team : [String] = []): [Manga!]!

    chapter(id: Int!): Chapter
    mangaChapters(manga_id: Int!): [Chapter!]!
    userChapters(first: Int = 50, mangaIds: [Int!]!, searchText: String = "", langage : [String] = [], team : [String] = []): [Chapter!]!
    allChapters(first: Int = 50, mangaIds: [Int]!, searchText: String = "", langage : [String] = [], team : [String] = []): [Chapter!]!

    allTeams(langage : [String] = ["fr"]): [Team!]!
  }
  type Mutation {
    registerUser(pseudo: String, email: String!, password: String!): AuthPayload!
    login (email: String!, password: String!): AuthPayload!
    like (manga_id: Int!): LikePayload!
    unlike (manga_id: Int!): LikePayload!
  }

  ${authTypeDefs}
  ${mangaTypeDefs}
`;

module.exports.typeDefs = typeDefs;

const resolvers = {
  ...mangaScalars,
  Query: {
    ...authQueries,
    ...mangaQueries
  },
  Mutation: {
    ...authMutations
  }
};

module.exports.resolvers = resolvers;