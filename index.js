const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const router = express.Router()


const app = express()

app.use(express.static('views'))
app.engine('html', ejs.renderFile)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

nunjucks.configure('views', {
    express: app,
    noCache: true
})

const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const homeworkRoute = require('./routes/homework')
const videosRoute = require('./routes/videos')
const subjectsRoute = require('./routes/subjects')
const noteRoute = require('./routes/note')
const dbRoute = require('./routes/database')

app.use('/', loginRoute)
app.use('/register', registerRoute)
app.use('/tarefas', homeworkRoute)
app.use('/videos', videosRoute)
app.use('/materias', subjectsRoute)
app.use('/conceitos', noteRoute)
app.use('/database', dbRoute)



app.listen(3000, () => {
    console.log('> Server running on port: 3000')
})