const mongoose = require('mongoose')

const bookingModel = new mongoose.Schema({
    bookingUser: {
        type: String,
        required: true
    },
    dates:{
        type: [String],
        required: true
    },
    rent: {
        type: String,
        required: true
    },
    logDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('booking', bookingModel)