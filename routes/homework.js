const express = require('express')
const router = express.Router()
const db = require('../database/db')


router.get('/', (req, res) =>{

    const query = `SELECT 
                        homeworks.title,
                        homeworks.created_at,
                        homeworks.delivery_date,
                        homeworks.homework_id,
                        subjects.subject_name,
                        users.name
                    FROM
                        homeworks
                        INNER JOIN subjects ON homeworks.subject_id = subjects.subject_id
                        INNER JOIN users ON homeworks.teacher_id = users.id
                    LIMIT 10`
    
    
    function afterConsultData(error, result){
        if(error){
            console.log(error)
            res.send('Erro na consulta')
        }
        else{
            res.render('templates/homework.html', { homeworks: result })
        }
    }

    db.all(query, afterConsultData)

})

router.get('/:id_tarefa', (req, res) => {

    const id_tarefa = req.params.id_tarefa

    const query = `SELECT
                        homeworks.title,
                        homeworks.description,
                        homeworks.delivery_date,
                        homeworks.created_at,
                        homeworks.archives,
                        subjects.subject_name,
                        users.name
                    FROM
                        homeworks
                        INNER JOIN subjects ON homeworks.subject_id = subjects.subject_id
                        INNER JOIN users ON homeworks.teacher_id = users.id
                    WHERE homeworks.homework_id = ${id_tarefa}`

    function afterConsultData(error, result){
        if(error){
            console.log(error)
            res.send('Erro na consulta')
        }
        else{
            res.render('templates/homework-selected.html', { homework: result })
        }
    }
    
    db.get(query, afterConsultData)

})

module.exports = router