const Proposal = require('../models/proposal')

exports.postProposal = async (req, res, next) => {
    const {walletAddress, projectId, description, amount, projectOwner } = req.body
    const proposal = await Proposal.create({ walletAddress, projectId, amount, description, projectOwner });
    res.status(200).json(proposal)
}

exports.getProposals = async (req, res, next) => {
    const { projectId } = req.params 
    const proposals = await Proposal.find({projectId})
    res.status(200).json(proposals)
}