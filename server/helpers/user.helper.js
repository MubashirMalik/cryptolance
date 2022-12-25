const Project = require('../models/project')

exports.getFreelancerFeedbacks = async (awardedTo) => {
    try {
        const projects = await Project.find({awardedTo})
        let feedback = 0
        for (let project of projects) {
            if (project?.freelancerFeedback?.ratings) {
                feedback += project.freelancerFeedback.ratings
            }
        }
        feedback = projects.length > 0 ? feedback/projects.length : 0
        return feedback
    } catch (error) {
        console.log(error);
    }
}