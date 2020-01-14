var express = require('express');
var router = express.Router();

const perscontroller = require('../controllers/perscontroller')

router.get('/get_student/:student', perscontroller.get_student)
router.get('/check_result/:cho_id', perscontroller.check_result)
router.get('/insert_pers_item_bank/:ib_code/:ib_name/:ib_sub_id/:ib_stem_amount/:ib_option_amount/:ib_type/:ib_progress/:ib_status', perscontroller.insert_pers_item_bank)
router.get('/get_pers_question_all', perscontroller.get_pers_question_all)
router.get('/insert_stem/:stem_sequence/:stem_qt_id/:stem_ib_id', perscontroller.insert_stem)
router.get('/get_subject_all', perscontroller.get_subject_all)
router.get('/get_pers_item_bank_by_id/:ib_id', perscontroller.get_pers_item_bank_by_id)
router.get('/delete_pers_item_bank/:ib_id', perscontroller.delete_pers_item_bank)
router.get('/update_pers_item_bank/:ib_name/:ib_stem_amount/:ib_id', perscontroller.update_pers_item_bank)
router.get('/get_pers_item_bank/:ib_sub_id', perscontroller.get_pers_item_bank)

module.exports = router