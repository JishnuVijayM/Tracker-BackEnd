const express = require('express');
const { getDashboard } = require('../controller/dashboard-controller');
const router = express.Router();

router.route('/getDashboard').get(getDashboard)

module.exports = router;