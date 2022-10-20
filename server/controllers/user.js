const User = require('../models/user')

exports.postUser = async (req, res, next) => {
    const {walletAddress, fullName, email, jobTitle, hourlyRate, country, category, bio} = req.body
    const user = await User.updateOne( 
        { walletAddress }, 
        { walletAddress, fullName, email, jobTitle, hourlyRate, country, category, bio }, 
        { upsert : true }, 
    );
    res.status(200).json(user)
}

exports.getUser = async (req, res, next) => {
    const { walletAddress } = req.query
    const user = await User.findOne({ walletAddress })
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400).json(user)
    } 
}