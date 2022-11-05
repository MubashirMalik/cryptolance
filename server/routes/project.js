const express = require('express')

const projectControllers = require('../controllers/project')

const router = express.Router()

router.get('/get-projects/:status/:filter/:address', projectControllers.getProjects)

router.get('/get-project/:projectId', projectControllers.getProject)

router.post('/update-project', projectControllers.updateProject)

router.post('/post-project', projectControllers.postProject)

module.exports = router