const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/', (req, res) =>{

    const query = `SELECT
                        subject_id,
                        subject_name
                    FROM subjects`

    function afterConsultData(error, result){
        if(error){
            console.log(error)
            res.send('Erro na consulta')
        }
        else{
            res.render('templates/subjects.html', {subjects: result})
        }
    }

    db.all(query, afterConsultData)
})

module.exports = router