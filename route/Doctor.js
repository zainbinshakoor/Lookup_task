
const express = require("express");
const router = express.Router();

const Doctor  = require("../schema/doctors")





router.get('/doctor', async (req, res) => {
    
    const DoctorList = await Doctor.find();
    console.log("DoctorList", DoctorList)
    res.send(DoctorList)
    
})

module.exports = router