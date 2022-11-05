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