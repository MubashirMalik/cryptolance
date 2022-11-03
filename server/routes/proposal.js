const express = require('express')

const proposalControllers = require('../controllers/proposal')

const router = express.Router()

router.get('/get-proposals/:projectId', proposalControllers.getProposals)

router.post('/post-proposal', proposalControllers.postProposal)

module.exports = router