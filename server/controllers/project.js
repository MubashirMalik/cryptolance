const Project = require('../models/project')

exports.postProject = async (req, res, next) => {
    const {walletAddress, title, description, budget, category } = req.body
    const project = await Project.updateOne( 
        { walletAddress}, 
        { walletAddress, title, description, budget, category }, 
        { upsert : true }, 
    );
    res.status(200).json(project)
}

exports.getProjects = async (req, res, next) => {
    const projects = await Project.find()
    res.status(200).json(projects)
}