const { gql } = require('apollo-server');

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
    allMangas: [Manga!]!

    chapter(id: Int!): Chapter
    mangaChapters(manga_id: Int!): [Chapter!]!
    allChapters(first: Int!): [Chapter!]!
  }
  type Mutation {
    registerUser(pseudo: String, email: String!, password: String!): AuthPayload!
    login (email: String!, password: String!): AuthPayload!
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