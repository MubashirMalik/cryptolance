const User = require('../models/user');
const { getFreelancerFeedbacks } = require("../helpers/user.helper")

exports.postUser = async (req, res, next) => {
    const {walletAddress, fullName, email, jobTitle, hourlyRate, country, category, bio, accountType, language} = req.body
    const user = await User.updateOne( 
        { walletAddress, accountType }, 
        { walletAddress, fullName, email, jobTitle, hourlyRate, country, category, bio, accountType, language }, 
        { upsert : true }, 
    );
    res.status(200).json(user)
}

exports.getUser = async (req, res, next) => {
    const { walletAddress, accountType } = req.query
    const user = await User.findOne({ walletAddress, accountType })
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400).json(user)
    } 
}

exports.getFreelancers = async (req, res, next) => {
    const users = await User.find({ accountType: "Freelancer" })
    for (let user of users) {
        const ratings = await getFreelancerFeedbacks(user.walletAddress)
        user.ratings = ratings
    }
    res.status(200).json(users)
}