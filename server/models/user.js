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
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    country: { 
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)