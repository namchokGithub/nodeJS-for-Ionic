const sql = require('../srp_connect')
const config = require('../config')

exports.get_subject_name = (req, res, next) => {
    sql.query(
        `   SELECT  stdCode,
                    stdName,
                    stdSurname,
                    curName,
                    etName,
                    sstName,
                    curAbbr,
                    syName
            FROM ${config.srp_dbname}.rg_Student
            LEFT JOIN ${config.srp_dbname}.rg_Regist ON ${config.srp_dbname}.rg_Student.stdId = ${config.srp_dbname}.rg_Regist.rgStdId
            LEFT JOIN ${config.srp_dbname}.rg_RegistDetails ON ${config.srp_dbname}.rg_RegistDetails.rdStdId = ${config.srp_dbname}.rg_Regist.rgStdId
            LEFT JOIN ${config.srp_dbname}.rg_Curriculum ON ${config.srp_dbname}.rg_Student.stdCurId = ${config.srp_dbname}.rg_Curriculum.curId
            LEFT JOIN ${config.srp_dbname}.rg_Term ON ${config.srp_dbname}.rg_RegistDetails.rdTmId = ${config.srp_dbname}.rg_Term.tmId
            LEFT JOIN ${config.srp_dbname}.rg_StudyYear ON ${config.srp_dbname}.rg_Student.stdSyId = ${config.srp_dbname}.rg_StudyYear.syId
            LEFT JOIN ${config.srp_dbname}.rg_StudentStatus ON ${config.srp_dbname}.rg_Student.stdSstId = ${config.srp_dbname}.rg_StudentStatus.sstId
            LEFT JOIN ${config.srp_dbname}.rg_Generation ON ${config.srp_dbname}.rg_Student.stdGenId = ${config.srp_dbname}.rg_Generation.genId
            LEFT JOIN ${config.srp_dbname}.rg_EntryType ON ${config.srp_dbname}.rg_Student.stdEtId = ${config.srp_dbname}.rg_EntryType.etId
            LEFT JOIN ${config.srp_dbname}.rg_EntryType2 ON ${config.srp_dbname}.rg_Student.stdEt2Id = ${config.srp_dbname}.rg_EntryType2.et2Id
            LEFT JOIN ${config.srp_dbname}.rg_PreAdmit ON ${config.srp_dbname}.rg_Student.stdPaId = ${config.srp_dbname}.rg_PreAdmit.paId
            LEFT JOIN ${config.srp_dbname}.rg_ScholarOwner ON ${config.srp_dbname}.rg_Student.stdSoId = ${config.srp_dbname}.rg_ScholarOwner.soId
            WHERE ${config.srp_dbname}.rg_Student.stdId = ? `, [
            req.params.stdId
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

exports.get_Course = (req, res, next) => {
    sql.query(
        `   SELECT  crsCode,
                    crsName,
                    crsNameE,
                    dfe_year AS year,
                    dfe_bg_id,
                    dfe_year,
                    dfe_tm_id,
                    tmCode,
                    tmName,
                    crsId
            FROM ${config.oes_dbname}.oes_assign
            LEFT JOIN ${config.srp_dbname}.rg_Course ON ${config.oes_dbname}.oes_assign.asg_crs_id= ${config.srp_dbname}.rg_Course.crsId 
            LEFT JOIN ${config.oes_dbname}.oes_assessor ON ${config.oes_dbname}.oes_assign.asg_id =  ${config.oes_dbname}.oes_assessor.asr_asg_id
            LEFT JOIN ${config.oes_dbname}.oes_define_exam ON ${config.oes_dbname}.oes_assign.asg_dfe_id = ${config.oes_dbname}.oes_define_exam.dfe_id
            LEFT JOIN ${config.srp_dbname}.rg_Term ON ${config.oes_dbname}.oes_define_exam.dfe_tm_id = ${config.srp_dbname}.rg_Term.tmId
            WHERE ${config.oes_dbname}.oes_assessor.asr_std_id = ?
            GROUP BY ${config.srp_dbname}.rg_Course.crsCode `, [
            req.params.stdId
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