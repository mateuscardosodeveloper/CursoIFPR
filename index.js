const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('views'))
app.engine('html', ejs.renderFile)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


app.get('/', (req, res) => {
    res.render('templates/main.html')
})

app.get('/registro', (req, res) =>{
    res.render('templates/register.html')
})

app.get('/tarefas', (req, res) =>{
    res.render('templates/homework.html')
})

app.get('/videos', (req, res) =>{
    res.render('templates/videos.html')
})

app.get('/materias', (req, res) =>{
    res.render('templates/subjects.html')
})

app.get('/conceitos', (req, res) =>{
    res.render('templates/note.html')
})



app.listen(3000, () => {
    console.log('> Server running on port: 3000')
})