const express = require("express");
const app = express();


const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();

app.use(express.json());
app.use(cors());

// Routes Exports
const doctorRoute = require("./route/Doctor");
const slotsRoute = require("./route/Slots");
const patientRoute = require("./route/Patient");

//doctor and sloute route
app.use("/", doctorRoute);
app.use("/",slotsRoute);
app.use("/",patientRoute)

//base route
app.get("/", (req, res) => {
    res.send("ZAINBINSHAKOOR Responding from HTTP Server");
    console.log('====================================');
    console.log('zain this api is working');
    console.log('====================================');
  });

  //connection With Live Server

mongoose.connect(process.env.CONNECTION_URL).then(() => { 
    app.listen(process.env.PORT, () => {
        console.log("running");
    });
});