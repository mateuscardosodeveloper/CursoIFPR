const express = require('express')
const router = express.Router()


router.get('/', (req, res) =>{
    res.render('templates/homework.html')
})

router.get('/:id_tarefa', (req, res) => {
    const id_tarefa = req.params.id_tarefa

    if(id_tarefa == 'tarefa_1'){
        res.render('templates/homework-0.html')
    }
    else{
        res.send('tarefa não encontrada')
    }
})

module.exports = router