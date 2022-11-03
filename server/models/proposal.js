const mongoose = require('mongoose')

const proposalSchema = mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    projectOwner: {
        type: String,
        required: true
    },
    amount:  {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
}, { versionKey: false })

module.exports = mongoose.model('Proposal', proposalSchema)