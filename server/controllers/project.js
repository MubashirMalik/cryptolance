const Project = require('../models/project')

exports.postProject = async (req, res, next) => {
    const {walletAddress, title, description, budget, category } = req.body
    const project = await Project.create({ walletAddress, title, description, budget, category });
    res.status(200).json(project)
}

exports.getProjects = async (req, res, next) => {
    const projects = await Project.find()
    res.status(200).json(projects)
}