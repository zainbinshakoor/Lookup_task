const mongoose = require("mongoose");



const patientSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required:true

    },
    status: {
        type: String,
        required:true
    },
    disease:{
        type:String,
        required:true
    }
})


const patient = mongoose.model('patient', patientSchema);


module.exports = patient;