var express = require('express')
var router = express.Router()

const oescontroller = require('../controllers/oescontroller')

/* GET */
router.get('/get_subject_name', oescontroller.get_subject_name)
router.get('/get_list_testing/:asg_std_id/:asg_crs_id', oescontroller.get_list_exam)
router.get('/get_detail_test/:asg_std_id/:asg_id', oescontroller.get_detail_test)
router.get('/get_list_question/:asg_id/:asg_id', oescontroller.get_list_question)
router.get('/get_list_choices/:asg_id/:asg_id', oescontroller.get_list_choices)
router.get('/get_time_testing/:asr_id', oescontroller.get_time_testing)
router.get('/update_end_testing/:rse_asr_id', oescontroller.update_end_testing)
router.get('/get_validation/:asr_asg_id', oescontroller.get_validation)
router.get('/check_insert/:rse_qt_id/:rse_asr_id', oescontroller.check_insert)
router.get('/insert_assessor/:asg_id/:asr_asg_id/:asg_id/:asg_id', oescontroller.insert_assessor)
router.get('/insert_result/:rse_asr_id/:rse_qt_id/:rse_opt_id/:rse_score', oescontroller.insert_result)
router.get('/update_result/:rse_opt_id/:rse_score/:rse_id', oescontroller.update_result)
router.get('/get_year/:asr_std_id', oescontroller.get_year)
router.get('/get_result_student/:asr_std_id/:search_dfe_year/:search_dfe_tm_id/:search_ib_sub_id', oescontroller.get_result_student)

module.exports = router;