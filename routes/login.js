const express = require('express')
const router = express.Router()



router.get('/', (req, res) => {
    res.render('templates/main.html')
})

module.exports = router