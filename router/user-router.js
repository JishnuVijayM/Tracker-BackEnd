const express = require('express');
const router = express.Router()

const userController = require('../controller/user-contoller')

router.route("/getUsers").get(userController.getUser)

module.exports = router