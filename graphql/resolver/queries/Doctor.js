
// const express = require("express");
// const router = express.Router();

const doctor = require("../../../schema/doctors")





// router.get('/doctor', async (req, res) => {

//     const DoctorList = await Doctor.find();
//     console.log("DoctorList", DoctorList)
//     res.send(DoctorList)

// })   



const router = {
  Query: {
    doctorsData: async (_, {  }) => {
      let searchTerm = "Female";
      const regex = new RegExp(`^${searchTerm}`, "i");

      const doctorList = await doctor.aggregate([
        {

          $lookup: {
            from: 'patients',
            localField: 'id',
            foreignField: 'id',
            as: 'patientDetail'
          },


        },
        {
          $unwind: "$patientDetail"
        },
        {
          $match: {

            'patientDetail.status': { $regex: regex }

          }
        }


      ])
      console.log(doctorList)

      return doctorList
    }

  }

}
module.exports = router

