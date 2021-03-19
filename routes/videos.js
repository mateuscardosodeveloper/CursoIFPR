const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.render('templates/videos.html')
})

module.exports = router