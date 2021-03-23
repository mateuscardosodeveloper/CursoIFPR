const express = require('express')
const router = express.Router()
const db = require('../database/db')
const token = require('../middleware/token')

router.get('/', token.required, (req, res) => {

    const query = `SELECT
                        subject_id,
                        subject_name
                    FROM subjects
                    WHERE classroom_id = ?`

    const value = [req.user.user_classroom_id]

    function afterConsultData(error, result) {
        if (error) {
            console.log(error)
            res.send('Erro na consulta')
        }
        else {
            res.render('templates/subjects.html', { subjects: result, user: req.user })
        }
    }

    db.all(query, value, afterConsultData)
})

router.post('/', token.required, (req, res) => {

    const query = `SELECT 
                        homeworks.title,
                        homeworks.description,
                        homeworks.created_at,
                        homeworks.delivery_date,
                        homeworks.homework_id,
                        subjects.subject_name
                    FROM
                        homeworks
                        INNER JOIN subjects ON homeworks.subject_id = subjects.subject_id
                    WHERE homeworks.subject_id = ?
                    LIMIT 10
                `
    const value = [req.body.filter]

    function afterConsultData(error, result) {
        if (error) {
            console.log(error)
            res.send('Erro na consulta')
        } else {
            const subQuery = `SELECT
                                    subject_id,
                                    subject_name
                                FROM subjects
                                WHERE classroom_id = ?`

            const values = [req.user.user_classroom_id]

            function afterConsultData2(error2, result2) {
                if (error2) {
                    console.log(error)
                    res.send('Erro na consulta')
                }
                else {
                    console.log(result)
                    res.render('templates/subjects.html', { subjects: result2, user: req.user, homeworks: result })
                }
            }

            db.all(subQuery, values, afterConsultData2)
        }
    }

    db.all(query, value, afterConsultData)
})

module.exports = router