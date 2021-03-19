const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.render('templates/note.html')
})

module.exports = router