const mongoose = require('mongoose') 
const User = require('./User')
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: User
    },
    text: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        name: true
    },
    likes: [{
        user: {
            type: mongoose.ObjectId,
            ref: User
        },
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    comments: [{
        text: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.ObjectId,
            ref: User
        },
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('post', PostSchema)