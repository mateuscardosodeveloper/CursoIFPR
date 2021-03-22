const express = require('express')
const db = require('../database/db')
const router = express.Router()


router.get('/', (req, res) => { 

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

    function afterConsultData(error, result){
        if(error){
            console.log(error)
            res.send('Erro na consulta')
        }
        else{
            res.render('templates/main.html', { homeworks: result })
        }
    }

    db.all(query, afterConsultData)

})

router.post('/', (req, res) => {

    const query = `SELECT * FROM user WHERE name = ?`

    const value = ['Mateus Henrique']

    function afterConsultData(error, result){
        if(error){
            res.send('Erro no servidor')
        }
        if(result){
            res.send(result)
        }
    }

    db.get(query, value, afterConsultData)

})

module.exports = router