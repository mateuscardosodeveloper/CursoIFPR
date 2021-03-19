const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'views/uploads')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() +'-'+ file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) =>{
    res.render('templates/register.html')
})

router.post('/', upload.single('image'), (req, res) =>{

    

    res.render('templates/register.html', { register: true })
})

module.exports = router