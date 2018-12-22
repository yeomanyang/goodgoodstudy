const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { resolvers } =  require('./src/resolve');
var DataLoader = require('dataloader')
const app = express();

const typeDefs = `
  type Author {
    id: Int!
    name: String
  }

  type Post {
    id: Int!
    title: String
    author: Author
  }

  type Query {
    posts: [Post]
    author(id: Int!): Author
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000);
