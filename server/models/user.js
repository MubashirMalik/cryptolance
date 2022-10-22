const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
    },
    fullName:  {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    jobTitle: {
        type: String,
    },
    hourlyRate: {
        type: Number,
    },
    country: { 
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    bio: {
        type: String,
        required: true
    },
    language: {
        type: String,
        require: true
    },
    accountType: {
        type: String,
        required: true,
    }
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)