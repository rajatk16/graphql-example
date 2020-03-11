import { GraphQLServer } from 'graphql-yoga';
import gql from 'graphql-tag';

// Type Definitions
const typeDefs = gql`
  type Query {
    me: User!
    post: Post!
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me: () => ({
      id: '64616566',
      name: 'Rajat',
      email: 'rajat@test.com',
      age: 25
    }),
    post: () => ({
      id: '5165651651',
      title: 'GraphQL Basics',
      body: 'Learn Basics of GraphQL',
      published: false
    }),
    user: (parent, args, ctx, info) => {}
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('GraphQL Server is running!'));
