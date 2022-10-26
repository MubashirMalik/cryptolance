const Proposal = require('../models/proposal')

exports.postProposal = async (req, res, next) => {
    const {walletAddress, projectId, description, amount } = req.body
    const proposal = await Proposal.create({ walletAddress, projectId, amount, description });
    res.status(200).json(proposal)
}

exports.getProposals = async (req, res, next) => {
    const proposals = await Proposal.find()
    res.status(200).json(proposals)
}