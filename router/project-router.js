const express =require('express');
const router = express.Router()

const projectController = require('../controller/project-contoller')

router.route("/getList").get(projectController.getProject)

module.exports = router;