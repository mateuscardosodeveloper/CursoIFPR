const jwt = require('jsonwebtoken')


exports.required = (req, res, next) => {

    try {
        const decode = jwt.verify(req.cookies.token, 'chaveprivada')
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        res.send('Erro na autenticação')
    }

}

exports.optional = (req, res, next) => {

    try {
        const decode = jwt.verify(req.cookies.token, 'chaveprivada')
        req.user = decode
        next()
    } catch (error) {
        next()
    }

}