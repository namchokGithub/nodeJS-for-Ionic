const sql = require('../oes_connect')
const config = require('../config')

//online_testing
exports.get_subject_name = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.oes_dbname}.oes_define_exam.dfe_bg_id AS ib_id,
                    ${config.pers_dbname}.pers_item_bank.ib_name AS ib_name,
                    ${config.pers_dbname}.pers_subjects.sub_code_th
            FROM ${config.oes_dbname}.oes_define_exam 
            LEFT JOIN ${config.pers_dbname}.pers_item_bank 
                        ON ${config.pers_dbname}.pers_item_bank.ib_id = ${config.oes_dbname}.oes_define_exam.dfe_bg_id
            LEFT JOIN ${config.pers_dbname}.pers_subjects 
                        ON ${config.pers_dbname}.pers_subjects.sub_id = ${config.pers_dbname}.pers_item_bank.ib_id
            GROUP BY ${config.pers_dbname}.pers_item_bank.ib_name `,
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.get_list_exam = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.oes_dbname}.oes_assign.asg_id AS asg_id,
                    ${config.pers_dbname}.pers_subjects.sub_code_th AS code_sub, 
                    ${config.pers_dbname}.pers_item_bank.ib_name AS test_name, 
                    ${config.oes_dbname}.oes_define_exam.dfe_datetime_start AS date_start, 
                    ${config.oes_dbname}.oes_define_exam.dfe_datetime_end AS date_end,
                    ${config.oes_dbname}.oes_define_exam.dfe_time AS time_exam,
                    ${config.oes_dbname}.oes_assessor.asr_score AS score,
                    /*เป็นการหาว่านักเรียนคนนั้นทำการสอบไปแล้วหรือยัง {*/
                    (CASE
                        WHEN ${config.oes_dbname}.oes_assign.asg_id IN (	SELECT ${config.oes_dbname}.oes_assessor.asr_asg_id 
                                                        FROM ${config.oes_dbname}.oes_assessor
                                                        WHERE ${config.oes_dbname}.oes_assessor.asr_score IS NOT NULL)
                        THEN    0
                        ELSE    1
                    END) AS status_test,
                    /*} สิ้นสุด*/
                    ${config.oes_dbname}.oes_define_exam.dfe_type AS type_exam
                    FROM ${config.oes_dbname}.oes_assign
                    LEFT JOIN ${config.oes_dbname}.oes_define_exam ON ${config.oes_dbname}.oes_assign.asg_dfe_id = ${config.oes_dbname}.oes_define_exam.dfe_id 
                    LEFT JOIN ${config.oes_dbname}.oes_assessor ON ${config.oes_dbname}.oes_assign.asg_id = ${config.oes_dbname}.oes_assessor.asr_asg_id
                    LEFT JOIN ${config.pers_dbname}.pers_item_bank ON ${config.oes_dbname}.oes_define_exam.dfe_bg_id = ${config.pers_dbname}.pers_item_bank.ib_id
                    LEFT JOIN ${config.pers_dbname}.pers_subjects ON ${config.pers_dbname}.pers_item_bank.ib_sub_id = ${config.pers_dbname}.pers_subjects.sub_id
                    WHERE ${config.oes_dbname}.oes_assign.asg_std_id = ?	AND ${config.oes_dbname}.oes_assign.asg_crs_id = ? `, [
            req.params.asg_std_id,
            req.params.asg_crs_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.get_detail_test = (req, res, next) => {
    sql.query(
        `   SELECT 	detail_subject.course_code,
                    detail_subject.course_name,
                    detail_subject.course_description,
                    detail_subject.crsUnit,
                    detail_subject.teacher,
                    detail_subject.tm_year,
                    ${config.pers_dbname}.pers_item_bank.ib_name AS name_testing,
                    ${config.pers_dbname}.pers_item_bank.ib_stem_amount AS amount_testing,
                    ${config.oes_dbname}.oes_define_exam.dfe_datetime_start AS date_start,
                    ${config.oes_dbname}.oes_define_exam.dfe_datetime_end AS date_end,
                    ${config.oes_dbname}.oes_define_exam.dfe_time AS time_testing
                    FROM 	${config.oes_dbname}.oes_assign
                    LEFT JOIN ${config.oes_dbname}.oes_define_exam ON ${config.oes_dbname}.oes_assign.asg_dfe_id = ${config.oes_dbname}.oes_define_exam.dfe_id
                    LEFT JOIN ${config.oes_dbname}.oes_assessor ON ${config.oes_dbname}.oes_assign.asg_id = ${config.oes_dbname}.oes_assessor.asr_asg_id
                    LEFT JOIN ${config.pers_dbname}.pers_item_bank ON ${config.pers_dbname}.pers_item_bank.ib_id = ${config.oes_dbname}.oes_define_exam.dfe_bg_id
                    /*เป็นตารางที่แยกย่อยมาสำหรับหารายชื่อวิชาที่นักเรียนคนนั้นไปทำการลงทะเบียน {*/
                    LEFT JOIN (SELECT 	${config.srp_dbname}.rg_Course.crsId AS course_id,
                                        ${config.srp_dbname}.rg_Course.crsCode AS course_code,
                                        ${config.srp_dbname}.rg_Course.crsName AS course_name,
                                        ${config.srp_dbname}.rg_Course.crsDescription AS course_description,
                                        ${config.srp_dbname}.rg_Course.crsUnit,
                                        concat(${config.srp_dbname}.rg_Prefix.pfName,' ',${config.srp_dbname}.rg_Person.prsfName,' ',${config.srp_dbname}.rg_Person.prslName) AS teacher,
                                        concat(${config.srp_dbname}.rg_CourseOpen.coTmId,'/',${config.srp_dbname}.rg_CourseOpen.coAcY) AS tm_year
                                FROM ${config.srp_dbname}.rg_RegistDetails 
                                LEFT JOIN ${config.srp_dbname}.rg_CourseOpen ON ${config.srp_dbname}.rg_RegistDetails.rdCoId = ${config.srp_dbname}.rg_CourseOpen.coId
                                LEFT JOIN ${config.srp_dbname}.rg_Course ON ${config.srp_dbname}.rg_CourseOpen.coCrsId = ${config.srp_dbname}.rg_Course.crsId
                                LEFT JOIN ${config.srp_dbname}.rg_Person ON ${config.srp_dbname}.rg_CourseOpen.coPrsId = ${config.srp_dbname}.rg_Person.prsId
                                LEFT JOIN ${config.srp_dbname}.rg_Prefix ON ${config.srp_dbname}.rg_Person.prsPfId = ${config.srp_dbname}.rg_Prefix.pfId
                                WHERE ${config.srp_dbname}.rg_RegistDetails.rdStdId = ?  ) AS detail_subject ON ${config.oes_dbname}.oes_assign.asg_crs_id = detail_subject.course_id
                    /*} สิ้นสุด*/
                    WHERE 	${config.oes_dbname}.oes_assign.asg_id = ? `, [
            req.params.asg_std_id,
            req.params.asg_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.get_list_question = (req, res, next) => {
    sql.query(
        `  SELECT 	${config.pers_dbname}.pers_question.qt_id,
                    ${config.pers_dbname}.pers_question.qt_text AS question,
                    IF(${config.pers_dbname}.pers_question.qt_id IN (	SELECT 	${config.oes_dbname}.oes_result_exam.rse_qt_id
                                                                                        FROM ${config.oes_dbname}.oes_result_exam
                                                                                        LEFT JOIN ${config.oes_dbname}.oes_assessor ON ${config.oes_dbname}.oes_assessor.asr_id = ${config.oes_dbname}.oes_result_exam.rse_asr_id
                                                                                        WHERE ${config.oes_dbname}.oes_assessor.asr_asg_id = ? ),1,0) AS Active
                    FROM ${config.oes_dbname}.oes_assign
                    LEFT JOIN ${config.oes_dbname}.oes_define_exam ON ${config.oes_dbname}.oes_assign.asg_dfe_id = ${config.oes_dbname}.oes_define_exam.dfe_id
                    LEFT JOIN ${config.pers_dbname}.pers_stem ON ${config.oes_dbname}.oes_define_exam.dfe_bg_id = ${config.pers_dbname}.pers_stem.stem_ib_id  
                    LEFT JOIN ${config.pers_dbname}.pers_question ON ${config.pers_dbname}.pers_stem.stem_qt_id = ${config.pers_dbname}.pers_question.qt_id
                    WHERE ${config.oes_dbname}.oes_assign.asg_id = ?
                    GROUP BY ${config.pers_dbname}.pers_question.qt_id
                    ORDER BY ${config.pers_dbname}.pers_stem.stem_sequence ASC  `, [
            req.params.asg_id,
            req.params.asg_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.get_list_choices = (req, res, next) => {
    sql.query(
        `   SELECT 	${config.pers_dbname}.pers_question.qt_id,
                    ${config.pers_dbname}.pers_choices.cho_id AS choices_id,
                    ${config.pers_dbname}.pers_choices.cho_text AS choices_text,
                    IF(${config.pers_dbname}.pers_choices.cho_id IN (	SELECT 	${config.oes_dbname}.oes_result_exam.rse_opt_id
                                                                                        FROM ${config.oes_dbname}.oes_result_exam
                                                                                        LEFT JOIN ${config.oes_dbname}.oes_assessor ON ${config.oes_dbname}.oes_assessor.asr_id = ${config.oes_dbname}.oes_result_exam.rse_asr_id
                                                                                        WHERE ${config.oes_dbname}.oes_assessor.asr_asg_id = ?),1,0) AS choice_select
                    FROM ${config.oes_dbname}.oes_assign
                    LEFT JOIN ${config.oes_dbname}.oes_define_exam ON ${config.oes_dbname}.oes_assign.asg_dfe_id = ${config.oes_dbname}.oes_define_exam.dfe_id
                    LEFT JOIN ${config.pers_dbname}.pers_stem ON ${config.oes_dbname}.oes_define_exam.dfe_bg_id = ${config.pers_dbname}.pers_stem.stem_ib_id  
                    LEFT JOIN ${config.pers_dbname}.pers_question ON ${config.pers_dbname}.pers_stem.stem_qt_id = ${config.pers_dbname}.pers_question.qt_id
                    LEFT JOIN ${config.pers_dbname}.pers_choices ON ${config.pers_dbname}.pers_question.qt_id = ${config.pers_dbname}.pers_choices.cho_qt_id
                    WHERE ${config.oes_dbname}.oes_assign.asg_id = ?
                    ORDER BY ${config.pers_dbname}.pers_stem.stem_sequence ASC `, [
            req.params.asg_id,
            req.params.asg_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.get_time_testing = (req, res, next) => {
    sql.query(
        `   SELECT  HOUR(TIMEDIFF( ${config.oes_dbname}.oes_assessor.asr_datetime_end, CURRENT_TIMESTAMP())) AS hour, 
                    MINUTE(TIMEDIFF( ${config.oes_dbname}.oes_assessor.asr_datetime_end, CURRENT_TIMESTAMP())) AS minute, 
                    SECOND(TIMEDIFF( ${config.oes_dbname}.oes_assessor.asr_datetime_end, CURRENT_TIMESTAMP())) AS second 
            FROM ${config.oes_dbname}.oes_assessor
            WHERE ${config.oes_dbname}.oes_assessor.asr_id = ?  `, [
            req.params.asr_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.update_end_testing = (req, res, next) => {
    sql.query(
        `   UPDATE  ${config.oes_dbname}.oes_assessor SET 	${config.oes_dbname}.oes_assessor.asr_time = TIMEDIFF(CURRENT_TIME(),TIME(${config.oes_dbname}.oes_assessor.asr_datetime_start)),
                                                            ${config.oes_dbname}.oes_assessor.asr_score = (	SELECT SUM(${config.oes_dbname}.oes_result_exam.rse_score)
                                                                                                            FROM ${config.oes_dbname}.oes_result_exam
                                                                                                            WHERE ${config.oes_dbname}.oes_result_exam.rse_asr_id = ? )`, [
            req.params.rse_asr_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.get_validation = (req, res, next) => {
    sql.query(
        `   SELECT ${config.oes_dbname}.oes_assessor.asr_id
            FROM ${config.oes_dbname}.oes_assessor
            WHERE ${config.oes_dbname}.oes_assessor.asr_asg_id = ? `, [
            req.params.asr_asg_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.check_insert = (req, res, next) => {
    sql.query(
        `   SELECT ${config.oes_dbname}.oes_result_exam.rse_id
            FROM ${config.oes_dbname}.oes_result_exam
            WHERE ${config.oes_dbname}.oes_result_exam.rse_qt_id = ? AND ${config.oes_dbname}.oes_result_exam.rse_asr_id = ? `, [
            req.params.rse_qt_id,
            req.params.rse_asr_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.insert_assessor = (req, res, next) => {
    sql.query(
        `   INSERT INTO ${config.oes_dbname}.oes_assessor (${config.oes_dbname}.oes_assessor.asr_dfe_id,${config.oes_dbname}.oes_assessor.asr_asg_id,${config.oes_dbname}.oes_assessor.asr_std_id,${config.oes_dbname}.oes_assessor.asr_datetime_end)
                        VALUES ((   SELECT ${config.oes_dbname}.oes_assign.asg_dfe_id
                                    FROM ${config.oes_dbname}.oes_assign
                                    WHERE ${config.oes_dbname}.oes_assign.asg_id = ?),
                                ?,
                                (   SELECT ${config.oes_dbname}.oes_assign.asg_std_id
                                    FROM ${config.oes_dbname}.oes_assign
                                    WHERE ${config.oes_dbname}.oes_assign.asg_id = ?),
                                    DATE_ADD(CURRENT_TIMESTAMP(), 
                                    INTERVAL (  SELECT ${config.oes_dbname}.oes_define_exam.dfe_time
                                                FROM ${config.oes_dbname}.oes_define_exam
                                                LEFT JOIN ${config.oes_dbname}.oes_assign ON oes_define_exam.dfe_id = oes_assign.asg_dfe_id
                                                WHERE oes_assign.asg_id = ?) MINUTE)) `, [
            req.params.asg_id,
            req.params.asr_asg_id,
            req.params.asg_id,
            req.params.asg_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query.insertId);
            }
        }
    )
}

exports.insert_result = (req, res, next) => {
    sql.query(
        `   INSERT INTO ${config.oes_dbname}.oes_result_exam (rse_asr_id, rse_qt_id, rse_opt_id, rse_score)
            VALUES (?, ?, ?, ?) `, [
            req.params.rse_asr_id,
            req.params.rse_qt_id,
            req.params.rse_opt_id,
            req.params.rse_score
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.update_result = (req, res, next) => {
    sql.query(
        `   UPDATE ${config.oes_dbname} .oes_result_exam SET rse_opt_id=?, rse_score =?
            WHERE ${config.oes_dbname} .oes_result_exam.rse_id = ? `, [
            req.params.rse_opt_id,
            req.params.rse_score,
            req.params.rse_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}

exports.get_year = (req, res, next) => {
    sql.query(
        `   SELECT dfe_year AS year
            FROM ${config.oes_dbname}.oes_assessor
            LEFT JOIN ${config.oes_dbname}.oes_define_exam ON ${config.oes_dbname}.oes_assessor.asr_dfe_id = ${config.oes_dbname}.oes_define_exam.dfe_id
            WHERE ${config.oes_dbname}.oes_assessor.asr_std_id = ?
            GROUP BY year`, [
            req.params.asr_std_id
        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }

    )
}

exports.get_result_student = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.pers_dbname}.pers_item_bank.ib_name,
                    ${config.oes_dbname}.oes_assessor.asr_score
        
            FROM ${config.oes_dbname}.oes_assessor
            LEFT JOIN ${config.oes_dbname}.oes_assign ON ${config.oes_dbname}.oes_assign.asg_id = ${config.oes_dbname}.oes_assessor.asr_asg_id
            LEFT JOIN ${config.oes_dbname}.oes_define_exam ON ${config.oes_dbname}.oes_assign.asg_dfe_id = ${config.oes_dbname}.oes_define_exam.dfe_id
            LEFT JOIN ${config.pers_dbname}.pers_item_bank ON ${config.oes_dbname}.oes_define_exam.dfe_bg_id = ${config.pers_dbname}.pers_item_bank.ib_id
            WHERE 	${config.oes_dbname}.oes_assessor.asr_std_id = ? 
                    AND ${config.oes_dbname}.oes_assessor.asr_score IS NOT NULL
                    ${req.params.search_dfe_year} ${req.params.search_dfe_year} ${req.params.search_ib_sub_id} `, [
            req.params.asr_std_id,

        ],
        (err, query) => {
            if (err) {
                console.log(err);
                console.log('select all error');
                res.json(err);
            } else {
                console.log('select all complete');
                res.json(query);
            }
        }
    )
}