const express = require('express')

const projectControllers = require('../controllers/project')

const router = express.Router()

router.get('/get-projects', projectControllers.getProjects)

router.post('/post-project', projectControllers.postProject)

module.exports = router