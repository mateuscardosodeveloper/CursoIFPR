const express = require('express')
const db = require('../database/db')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const token = require('../middleware/token')


router.get('/', token.optional, (req, res) => {

    if (req.user) {
        res.redirect('/tarefas')
    } else {
        const query = `SELECT
                        homeworks.description,
                        subjects.subject_name,
                        classrooms.classroom_name
                    FROM 
                        homeworks
                        INNER JOIN subjects ON homeworks.subject_id = subjects.subject_id
                        INNER JOIN classrooms ON homeworks.classroom_id = classrooms.classroom_id
                    ORDER BY homework_id DESC
                    LIMIT 4`

        function afterConsultData(error, result) {
            if (error) {
                console.log(error)
                res.send('Erro na consulta')
            }
            else {
                res.render('templates/main.html', { homeworks: result })
            }
        }

        db.all(query, afterConsultData)

    }



})

router.post('/', (req, res) => {

    const query = `SELECT
                        users.id,
                        users.classroom_id,
                        users.password,
                        users.name,
                        classrooms.classroom_name,
                        users.image
                    FROM 
                        users
                        INNER JOIN classrooms ON users.classroom_id = classrooms.classroom_id
                    WHERE users.login = ?`

    const values = [req.body.login]

    function afterConsultData(error, results) {
        if (error) {
            console.log(error)
            res.send('Falha na autenticação')
        } if (results < 1) {
            res.send('Usuário não encontrado')
        } else {
            bcrypt.compare(req.body.password, results.password, (errorBcrypt, result) => {
                if (errorBcrypt) {
                    console.log(errorBcrypt)
                    res.send('Erro na autenticação')
                } if (result) {
                    const token = jwt.sign({
                        user_id: results.id,
                        user_name: results.name,
                        user_classroom: results.classroom_name,
                        user_classroom_id: results.classroom_id,
                        user_image: results.image
                    }, 'chaveprivada', {
                        expiresIn: '1h'
                    })

                    console.log(token)

                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 24 * 3600000)
                    }).redirect('/tarefas')
                }
            })
        }

    }

    db.get(query, values, afterConsultData)

})

module.exports = router