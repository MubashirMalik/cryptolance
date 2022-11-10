const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    projectId: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sender:  {
        type: String,
        required: true
    },
    file: {
        data: Buffer,
        name: String
    }
}, { versionKey: false })

module.exports = mongoose.model('Message', messageSchema)