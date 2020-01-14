var express = require('express');
var router = express.Router();

const srpcontroller = require('../controllers/srpcontroller')

router.get('/get_subject_name/:stdId', srpcontroller.get_subject_name)
router.get('/get_Course/:stdId', srpcontroller.get_Course)

module.exports = router;


module.exports = router;