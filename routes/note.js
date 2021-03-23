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
            res.render('templates/note.html', { subjects: result, user:req.user})
        }
    }

    db.all(query, value, afterConsultData)
})

module.exports = router