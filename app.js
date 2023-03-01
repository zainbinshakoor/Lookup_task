const express = require("express");
const app = express();

const { ApolloServer } = require('apollo-server');
const schema = require("./graphql")


const cors = require("cors");
const mongoose = require("mongoose");
mongoose.pluralize(null);

require('dotenv').config();

app.use(express.json());
app.use(cors());

// Routes Exports
// const resolvers = require("./route/Doctor");
const slotsRoute = require("./route/Slots");
const patientRoute = require("./route/Patient");

//doctor and sloute route
// app.use("/", doctorRoute);
app.use("/", slotsRoute);
app.use("/", patientRoute);
    
//base route
app.get("/", (req, res) => {
    res.send("ZAINBINSHAKOOR Responding from HTTP Server");
    console.log('====================================');
    console.log('zain this api is working');
    console.log('====================================');
});
//apollo server
const server = new ApolloServer({
    schema

})
// server.applyMiddleware({ app })
const url = process.env.APOLLO_SERVER_URL;
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}api`);
  });
console.log(`Server is ready at ${url}`);

//mongodb connection
mongoose.connect(process.env.CONNECTION_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(
            `Server started & listening on ${process.env.PORT}`
        )
    });
});