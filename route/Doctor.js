
// const express = require("express");
// const router = express.Router();

const Doctor = require("../schema/doctors")





// router.get('/doctor', async (req, res) => {

//     const DoctorList = await Doctor.find();
//     console.log("DoctorList", DoctorList)
//     res.send(DoctorList)

// })



const router = {
    Query: {
        doctorsData: async (_,{}) => {

            let doctorsDetail = await Doctor.find();
            console.log(doctorsDetail);
            return doctorsDetail
        }

    }
}
module.exports = router

