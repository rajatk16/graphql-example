import { GraphQLServer } from 'graphql-yoga';
import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    hey: String!
  }
`;

const resolvers = {
  Query: {
    hey: () => 'this is my first query'
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('GraphQL is running!'));
