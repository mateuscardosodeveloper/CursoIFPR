const express = require('express')
const router = express.Router()
const token = require('../middleware/token')

router.get('/', token.required, (req, res) =>{
    res.render('templates/videos.html', {user: req.user})
})

module.exports = router