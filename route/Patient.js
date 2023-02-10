
const express = require("express");
const router = express.Router();

const patient  = require("../schema/patient")


router.get('/pat', async (req, res) => {
    
    const patientList = await patient.find();
    console.log("patient", patient)
    res.send(patientList)
    
})

module.exports = router