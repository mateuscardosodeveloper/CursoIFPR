const express = require("express");
const dbase = require('../database/db.js');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './views/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });


router.get('/', (req, res) => {
    const query = `SELECT * FROM classrooms`;

    function afterInsertData(err, result) {
        if(err) {
            console.log(err);
            return res.send(`Erro no servidor`); 
        }
        else{

            const subQuery = `SELECT subject_id, subject_name FROM subjects`;

            function aftetConsultData(err, results){
                if (err) {
                    console.log(err);
                    return res.send(`Erro no servidor`); 
                }
                else{
                    res.render('templates/tabelas.html', { classrooms: result, subjects: results });
                }
            }

            dbase.all(subQuery, aftetConsultData);
        }
    }

    dbase.all(query, afterInsertData);
});

router.post('/users', upload.single('image'), (req, res) => {

        const query = `
        INSERT INTO users (
            login,
            email,
            password,
            name,
            birthday,
            classroom_id,
            ra,
            image
        ) VALUES (?,?,?,?,?,?,?,?);
    `;

    const values = [
        req.body.login,
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.birthday,
        req.body.classroom_id,
        req.body.ra,
        req.file.filename
    ];

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.status(500).send(`Erro no cadastro`); 
        }
        else{
            res.render("templates/tabelas.html", {saved: true});
        }
    }

    dbase.run(query, values, afterInsertData);

});

router.post('/classrooms', (req, res) => {

    const query = `INSERT INTO classrooms (classroom_name) VALUES (?)`;

    const values = [req.body.classroom_name];

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.status(500).send(`Erro no cadastro`); 
        }
        else{
            res.render("templates/tabelas.html", {saved: true});
        }
    }

    dbase.run(query, values, afterInsertData);

});

router.post('/homeworks', upload.single('archives'), (req, res) => {

    const query = `
        INSERT INTO homeworks (
            classroom_id,
            subject_id,
            description,
            archives,
            teacher_id,
            title,
            created_at,
            delivery_date
        ) VALUES (?,?,?,?,?,?,datetime('now', 'localtime'),?);
    `;

    const values = [
        req.body.classroom_id,
        req.body.subject_id,
        req.body.description,
        req.file.filename,
        req.body.teacher_id,
        req.body.title,
        req.body.delivery_date
    ];

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.status(500).send(`Erro no cadastro`); 
        }
        else{
            res.render("templates/tabelas.html", {saved: true});
        }
    }

    dbase.run(query, values, afterInsertData);

});

router.post('/subjects', (req, res) => {

        const query = `
        INSERT INTO subjects (
            subject_name,
            classroom_id
        ) VALUES (?,?);
    `;

    const values = [
        req.body.name,
        req.body.classroom_id
    ];

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.status(500).send(`Erro no cadastro`); 
        }
        else{
            res.render("templates/tabelas.html", {saved: true});
        }
    }

    dbase.run(query, values, afterInsertData);

});

module.exports = router;