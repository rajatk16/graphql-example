import { GraphQLServer } from 'graphql-yoga';
import gql from 'graphql-tag';

const posts = [
  {
    id: '1',
    title: 'React',
    body: 'create-react-app',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Vue',
    body: 'create-vue-app',
    published: false,
    author: '1'
  },
  {
    id: '3',
    title: 'Angular',
    body: 'create-angular-app',
    published: false,
    author: '2'
  }
];

const users = [
  {
    id: '1',
    name: 'Rajat',
    email: 'rajat.sudagade@gmail.com',
    age: 24
  },
  {
    id: '2',
    name: 'Clark Kent',
    email: 'ckent@dailyplanet.com',
    age: 35
  },
  {
    id: '3',
    name: 'Bruce Wayne',
    email: 'bwayne@waynetech.com',
    age: 35
  }
];

const comments = [
  {
    id: '1',
    text: 'Wow!',
    author: '3',
    post: '3'
  },
  {
    id: '2',
    text: 'Amazing!',
    author: '3',
    post: '1'
  },
  {
    id: '3',
    text: 'Great!',
    author: '3',
    post: '2'
  },
  {
    id: '4',
    text: 'Just Ok',
    author: '3',
    post: '1'
  }
];

// Type Definitions
const typeDefs = gql`
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    user(email: String!): User
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post
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
    user: (parent, args, ctx, info) => {
      const foundUser = users.find(user => user.email === args.email);
      return foundUser;
    },
    users: (parent, args, ctx, info) => {
      if (!args.query) return users;
      return users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    posts: (parent, args, ctx, info) => {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post =>
        post.title.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    comments: (parent, args, ctx, info) => {
      if (!args.query) {
        return comments;
      }
      return comments.filter(comment =>
        comment.text.toLowerCase().includes(args.query.toLowerCase())
      );
    }
  },
  Post: {
    author: (parent, args, ctx, info) => {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments: (parent, args, ctx, info) => {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts: (parent, args, ctx, info) => {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments: (parent, args, ctx, info) => {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author: (parent, args, ctx, info) => {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post: (parent, args, ctx, info) => {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('GraphQL Server is running!'));
