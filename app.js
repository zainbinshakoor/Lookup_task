const express = require("express");
const app = express();


const cors = require("cors");
const mongoose = require("mongoose");
mongoose.pluralize(null);

require('dotenv').config();

app.use(express.json());
app.use(cors());

// Routes Exports
const doctorRoute = require("./route/Doctor");
const slotsRoute = require("./route/Slots");
const patientRoute = require("./route/Patient");
//schema
const patientSchema = require("./schema/patient")

//doctor and sloute route
app.use("/", doctorRoute);
app.use("/",slotsRoute);
app.use("/",patientRoute);

//base route
app.get("/", (req, res) => {
    res.send("ZAINBINSHAKOOR Responding from HTTP Server");
    console.log('====================================');
    console.log('zain this api is working');
    console.log('====================================');
  });

mongoose.connect(process.env.CONNECTION_URL).then(() => { 
    app.listen(process.env.PORT, () => {
        console.log("running");
    });
});