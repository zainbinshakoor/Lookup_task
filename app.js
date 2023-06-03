const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./graphql");

const cors = require("cors");
const mongoose = require("mongoose");
mongoose.pluralize(null);

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes Exports
// const resolvers = require("./route/Doctor");
const slotsRoute = require("./route/Slots");
const patientRoute = require("./route/Patient");

// doctor and slot route
// app.use("/", doctorRoute);
app.use("/", slotsRoute);
app.use("/", patientRoute);

// base route
app.get("/", (req, res) => {
  res.send("ZAINBINSHAKOOR Responding from HTTP Server");
});

// apollo server
async function startServer() {
  const server = new ApolloServer({
    schema,
    playground: {
      endpoint: "/api",
      introspection: true,
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  // mongodb connection
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Server started & listening on port ${process.env.PORT}`);
      });
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
}

startServer();
