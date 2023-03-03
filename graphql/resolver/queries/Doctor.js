
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
        doctorsData: async (_, { Id }) => {
            console.log(Id);

            const doctorList = await doctor.aggregate([
                {

                    $lookup: {
                        from: 'patient',
                        localField: 'id',
                        foreignField: 'id',
                        as: 'patientDeatil'
                    }
                },
                {
                    $unwind: '$patientDeatil'
                },
                {
                    $match: {
                        id: Id
                    }
                }


            ])
            console.log(doctorList)

            return doctorList
        }

    }

}
module.exports = router

