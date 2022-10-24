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
}, { versionKey: false })

module.exports = mongoose.model('Project', projectSchema)