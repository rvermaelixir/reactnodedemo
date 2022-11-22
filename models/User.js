const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        default: Date.now()
    } 
})

module.exports = User = mongoose.model('user', userModel)