const express = require('express');
const router = express.Router();
const { scheduleMaintenance } = require('../controllers/schedulerController');

router.get('/schedule', scheduleMaintenance);

module.exports = router;