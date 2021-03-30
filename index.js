const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 3000;
const SECRET = 'oKJhJsAHyBjAJHbm8#129%@';
const contatos = require('./contatos.json');

app.use(express.json());
app.listen(port , () => {
    console.log('Servidor iniciado!');
});

app.post('/login', (req, res) => {
    if(req.body.username === 'paulohenrique' && req.body.username === 'herique'){
        const id = 1;
        const token = jwt.sign({id} , SECRET , {expiresIn: 300});
        res.send({token});
    }else{
        res.status(403).send({message : 'Acesso Negado'});
    }
})







app.get('/', (req, res) => {
    res.send(contatos)
})
