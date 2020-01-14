const sql = require('../per_connect')
const config = require('../config')

exports.get_student = (req, res, next) => {
    sql.query(
        `  SELECT   ${config.ums_dbname}.umuser.UsName AS name
                    ${config.ums_dbname}.umuser.UsPsCode AS code
                    FROM ${config.ums_dbname}.umuser
                    WHERE ${config.ums_dbname}.umuser.UsPsCode = ?`, [
            req.param.student,
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

exports.check_result = (req, res, next) => {
    sql.query(
        `   SELECT ${config.pers_dbname}.pers_choices.cho_answer
            FROM ${config.pers_dbname}.pers_choices
            WHERE ${config.pers_dbname}.pers_choices.cho_id = ? `, [
            req.params.cho_id
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

exports.get_pers_item_bank = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.pers_dbname}.pers_item_bank.ib_id,
                    ${config.pers_dbname}.pers_item_bank.ib_name
            FROM ${config.pers_dbname}.pers_item_bank
            WHERE ${config.pers_dbname}.pers_item_bank.ib_sub_id = ?`, [
            req.params.ib_sub_id
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

exports.get_pers_item_bank_by_id = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.pers_dbname}.pers_item_bank.ib_id,
                    ${config.pers_dbname}.pers_item_bank.ib_name,
                    ${config.pers_dbname}.pers_item_bank.ib_stem_amount
            FROM ${config.pers_dbname}.pers_item_bank
            WHERE ${config.pers_dbname}.pers_item_bank.ib_id = ?`, [
            req.params.ib_id
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

exports.delete_pers_item_bank = (req, res, next) => {
    sql.query(
        `   DELETE 
            FROM ${config.pers_dbname}.pers_item_bank
            WHERE ${config.pers_dbname}.pers_item_bank.ib_id = ?`, [
            req.params.ib_id
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
exports.update_pers_item_bank = (req, res, next) => {
    sql.query(
        `   UPDATE ${config.pers_dbname}.pers_item_bank
            SET ${config.pers_dbname}.pers_item_bank.ib_name = ?,
                ${config.pers_dbname}.pers_item_bank.ib_stem_amount = ?
            WHERE ${config.pers_dbname}.pers_item_bank.ib_id = ?`, [
            req.params.ib_name,
            req.params.ib_stem_amount,
            req.params.ib_id
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
exports.insert_pers_item_bank = (req, res, next) => {
    sql.query(
        `   INSERT INTO ${config.pers_dbname}.pers_item_bank (ib_code,ib_name,ib_sub_id,ib_stem_amount,ib_option_amount,ib_type,ib_progress,ib_status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            req.params.ib_code,
            req.params.ib_name,
            req.params.ib_sub_id,
            req.params.ib_stem_amount,
            req.params.ib_option_amount,
            req.params.ib_type,
            req.params.ib_progress,
            req.params.ib_status
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

exports.get_subject_all = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.pers_dbname}.pers_subjects.sub_id,
                    ${config.pers_dbname}.pers_subjects.sub_code_th,
                    ${config.pers_dbname}.pers_subjects.sub_name_th
            FROM ${config.pers_dbname}.pers_subjects`,
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

exports.get_pers_question_all = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.pers_dbname}.pers_question.qt_id,
                    ${config.pers_dbname}.pers_question.qt_text
            FROM ${config.pers_dbname}.pers_question
            WHERE ${config.pers_dbname}.pers_question.qt_status = 1 AND ${config.pers_dbname}.pers_question.qt_type = 1`,
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

exports.insert_stem = (req, res, next) => {
    sql.query(
        `   INSERT INTO ${config.pers_dbname}.pers_stem (stem_sequence,stem_qt_id,stem_ib_id) 
            VALUES (?, ?, ?)`, [
            req.params.stem_sequence,
            req.params.stem_qt_id,
            req.params.stem_ib_id
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