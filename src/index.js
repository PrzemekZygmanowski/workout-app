const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const colors = require("colors");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
  },
};

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.use((req, res) => {
    res.send("hello from express");
  });

  const PORT = process.env.PORT || 4000;

  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jwudy.mongodb.net/test`
    )
    .then(() => {
      app.listen(
        PORT,
        console.log(`server is running on port ${PORT}`.yellow.bold)
      );
    })
    .catch((err) => {
      console.log(err.red.bold);
    });
}
startServer();
