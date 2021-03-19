const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.render('templates/subjects.html')
})

module.exports = router