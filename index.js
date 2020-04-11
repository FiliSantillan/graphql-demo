'use strict'

const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const cors = require("cors");
const gqlMiddleware = require('express-graphql');
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers");

const app = express();
const port = process.env.port || 3000;
const isDev = process.env.NODE_ENV !== "production";

// Definiendo el schema
const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);

const schema = makeExecutableSchema({typeDefs, resolvers});

app.use(cors())

// Vamos a definir el middleware en un endpoint
app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
