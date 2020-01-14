const sql = require('../user_connect')
const config = require('../config')

exports.insert_user = (req, res, next) => {
    sql.query(
        `   INSERT INTO ${config.user_dbname}.user_information (user_id, user_password, user_firstname, user_lastname, type) 
            VALUES(?,?,?,?,?)`, [
            req.params.user_id,
            req.params.user_password,
            req.params.user_fisrtname,
            req.params.user_lastname,
            req.params.type
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
exports.get_user_all = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.user_dbname}.user_information.id,
                    ${config.user_dbname}.user_information.user_password,
                    ${config.user_dbname}.user_information.user_firstname,
                    ${config.user_dbname}.user_information.user_lastname
            FROM ${config.user_dbname}.user_information`,
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

exports.check_user = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.user_dbname}.user_information.id,
                    ${config.user_dbname}.user_information.user_firstname,
                    ${config.user_dbname}.user_information.user_lastname,
                    ${config.user_dbname}.user_information.type
            FROM ${config.user_dbname}.user_information
            WHERE ${config.user_dbname}.user_information.user_id = ?  AND ${config.user_dbname}.user_information.user_password = ? `, [
            req.params.user_id,
            req.params.user_password
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

exports.get_information_user = (req, res, next) => {
    sql.query(
        `   SELECT  ${config.user_dbname}.user_information.user_password,
                    ${config.user_dbname}.user_information.user_firstname,
                    ${config.user_dbname}.user_information.user_lastname
            FROM ${config.user_dbname}.user_information
            WHERE ${config.user_dbname}.user_information.id = ?`, [
            req.params.id
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

exports.edit_information_user = (req, res, next) => {
    sql.query(
        `   UPDATE ${config.user_dbname}.user_information
            SET ${config.user_dbname}.user_information.user_password = ?,
                ${config.user_dbname}.user_information.user_firstname = ?,
                ${config.user_dbname}.user_information.user_lastname = ?
            WHERE ${config.user_dbname}.user_information.id = ?`, [
            req.params.user_password,
            req.params.user_fisrtname,
            req.params.user_lastname,
            req.params.id
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

exports.delete_information_user = (req, res, next) => {
    sql.query(
        `   DELETE 
            FROM ${config.user_dbname}.user_information
            WHERE ${config.user_dbname}.user_information.id = ?`, [
            req.params.id
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

// exports.get_user_all = (req, res, next) => {
//     sql.query(
//         `   SELECT  ${config.user_dbname}.user_information.id,
//                     ${config.user_dbname}.user_information.user_firstname,
//                     ${config.user_dbname}.user_information.user_lastname
//             FROM ${config.user_dbname}.user_information
//             WHERE ${config.user_dbname}.user_information.type = 1`,
//         (err, query) => {
//             if (err) {
//                 console.log(err);
//                 console.log('select all error');
//                 res.json(err);
//             } else {
//                 console.log('select all complete');
//                 res.json(query);
//             }
//         }
//     )
// }