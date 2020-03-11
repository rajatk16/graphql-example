import { GraphQLServer } from 'graphql-yoga';
import gql from 'graphql-tag';

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
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('GraphQL Server is running!'));
