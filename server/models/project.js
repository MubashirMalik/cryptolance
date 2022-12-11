const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
    },
    title:  {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    budget: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    awardedTo: String,
    freelancerFeedback: {
        message: String,
        ratings: Number
    },
    employerFeedback: {
        message: String,
        ratings: Number
    }
}, { versionKey: false })

module.exports = mongoose.model('Project', projectSchema)