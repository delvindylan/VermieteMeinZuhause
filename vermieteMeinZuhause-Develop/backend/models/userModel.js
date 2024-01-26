const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    eMail: {
        type: String,
        required: true
    },
    logDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userModel)