const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");

const typeDefs = require("./typeDefs");
const isAuth = require("./middleware/isAuth");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(isAuth);

  // console.log(resolvers);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.use(cors());
  app.use((req, res) => {
    res.send("hello from express");
  });

  const PORT = process.env.PORT || 4000;

  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jwudy.mongodb.net/test`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    .then(() => {
      app.listen(
        PORT,
        console.log(`server is running on port ${PORT}`.yellow.bold.inverse)
      );
    })
    .catch((err) => {
      console.log(err.red.bold);
    });
}
startServer();
