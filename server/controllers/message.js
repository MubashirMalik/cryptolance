const fs = require('fs');
const rootDir = require('path').resolve('./');
const Message = require('../models/message')

exports.postMessage = async (req, res, next) => {
    const {sender, projectId, message } = req.body
    const insertedMessage = await Message.create({ sender, projectId, message });
    res.status(200).json(insertedMessage)
}

exports.getMessages = async (req, res, next) => {
    const { projectId } = req.params 
    const messages = await Message.find({projectId})
    res.status(200).json(messages)
}

exports.postFile = async (req, res, next) => {
    const {sender, projectId } = req.body
    const insertedMessage = await Message.create({ 
        sender, 
        projectId,
        file: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            name: req.file.filename
        },
        message: 'Attachment'
    });
    res.status(200).json({
        _id: insertedMessage._id,
        projectId: insertedMessage.projectId,
        message: insertedMessage.message, 
        sender: insertedMessage.sender, 
    })
}

exports.downloadFile = async (req, res, next) => {
    const { messageId } = req.params
    try {
        const message = await Message.findOne({_id: messageId})
        res.status(200).json(message)
        // res.download(`uploads/${message.file.name}`)
    } catch (err) {
        console.log(err);
    }
}