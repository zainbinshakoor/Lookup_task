
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
        doctorsData: async () => {

            const doctorList = await doctor.aggregate([
                {
        
                    $lookup: {
                        from: 'patient',
                        localField: 'id',
                        foreignField: 'id',
                        as: 'patientDeatils'
                    }
                },
                {$unwind: '$patientDeatils'},
                
        
            ])
            console.log(doctorList)
            
            return doctorList
        }

    }

}
module.exports = router

