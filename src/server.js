import { GraphQLServer } from 'graphql-yoga';
import gql from 'graphql-tag';

<<<<<<< HEAD
// Type Definitions
const typeDefs = gql`
  type Query {
    hey: String!
    name: String!
    location: String!
    bio: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hey: () => 'this is my first Query',
    name: () => 'Rajat S',
    location: () => 'Dallas TX',
    bio: () => 'Developer at Infovision'
=======
const typeDefs = gql`
  type Query {
    hey: String!
  }
`;

const resolvers = {
  Query: {
    hey: () => 'this is my first query'
>>>>>>> 56f8b480acd46c78d202fd194983ab04ccf357a8
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

<<<<<<< HEAD
server.start(() => console.log('GraphQL Server is running!'));
=======
server.start(() => console.log('GraphQL is running!'));
>>>>>>> 56f8b480acd46c78d202fd194983ab04ccf357a8
