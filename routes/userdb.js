var express = require('express');
var router = express.Router();

const usercontroller = require('../controllers/usercontroller')

router.get('/insert_user/:user_id/:user_password/:user_fisrtname/:user_lastname/:type', usercontroller.insert_user)
router.get('/check_user/:user_id/:user_password', usercontroller.check_user)
router.get('/get_information_user/:id', usercontroller.get_information_user)
router.get('/edit_information_user/:user_password/:user_firstname/:user_lastname/:id', usercontroller.edit_information_user)
router.get('/delete_information_user/:id', usercontroller.delete_information_user)
router.get('/get_user_all', usercontroller.get_user_all)
module.exports = router;