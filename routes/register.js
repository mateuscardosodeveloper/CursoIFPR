const express = require('express')
const router = express.Router()
const multer = require('multer')
const db = require('../database/db')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'views/uploads')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {

    const query = `SELECT
                        classroom_name,
                        classroom_id
                    FROM classrooms`

    function afterConsultData(error, result) {
        if (error) {
            console.log(error)
            res.send('Erro na consulta')
        }
        else {
            res.render('templates/register.html', { classrooms: result })
        }
    }

    db.all(query, afterConsultData)

})

router.post('/', upload.single('image'), (req, res) => {

    bcrypt.hash(req.body.password, 10, (errorHash, hash) => {
        if (errorHash) {
            console.log(errorHash)
            res.send('Erro no cadastro')
        } else {
            const query = `INSERT INTO users (
                login,
                email,
                password,
                name,
                birthday,
                classroom_id,
                ra,
                image
                ) VALUES (?,?,?,?,?,?,?,?)`

            const values = [
                req.body.login,
                req.body.email,
                hash,
                req.body.name,
                req.body.birthday,
                req.body.classroom_id,
                req.body.ra,
                req.file.filename
            ]

            function afterinsertData(error) {
                if (error) {
                    res.send(error)
                }
                else {
                    res.render('templates/register.html', { register: true })
                }
            }

            db.run(query, values, afterinsertData)
        }
    })


})

module.exports = router