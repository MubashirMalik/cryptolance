const Project = require('../models/project')
const mongoose = require('mongoose');

exports.postProject = async (req, res, next) => {
    const {walletAddress, title, description, budget, category } = req.body
    const project = await Project.create({ 
        walletAddress, 
        title, 
        description, 
        budget, 
        category,
        status: 'Open'
    });
    res.status(200).json(project)
}

// Bad controller example, 1 route/controller should perform one task, don't opt for generic code here
exports.getProjects = async (req, res, next) => {
    const { status, filter, address } = req.params
    let projects;
    if (filter === "all") {
        projects = await Project.find({status})
    } else {
        projects = await Project.find({ 
            $or: [ {status}, { walletAddress: address }, { awardedTo: address } ] 
        })
    }
    res.status(200).json(projects)
}

exports.getUserProjects = async (req, res, next) => {
    const { walletAddress, viewType } = req.params
    let projects
    if (viewType === "Freelancer") {
        projects = await Project.find({ awardedTo: walletAddress })
        res.status(200).json(projects)
    } else {
        projects = await Project.find({  walletAddress })
        res.status(200).json(projects)
    }
}

exports.getProject = async (req, res, next) => {
    const projectId = mongoose.Types.ObjectId(req.params.projectId)
    const project = await Project.findOne({_id: projectId})
    res.status(200).json(project)
}

exports.updateProject = async (req, res, next) => {
    const { awardedTo, status } = req.body
    const projectId = mongoose.Types.ObjectId(req.body.projectId)
    const project = await Project.updateOne(
        {_id: projectId},
        { $set: 
            {
                status,
                awardedTo
            }
        }
    )
    res.status(200).json(project)
}

exports.postFeedback = async (req, res, next) => {
    const { message, ratings, provider } = req.body
    const projectId = mongoose.Types.ObjectId(req.body.projectId)

    let feedback = { ratings, message}
    if (provider === "freelancer") {
        const project = await Project.updateOne(
            {_id: projectId},
            { $set: { freelancerFeedback: feedback}}
        )
        res.status(200).json(project)
    } else {
        const project = await Project.updateOne(
            {_id: projectId},
            { $set: { employerFeedback: feedback }}
        )
        res.status(200).json(project)
    }
}