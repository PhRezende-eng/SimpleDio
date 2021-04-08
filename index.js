const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 3000;
const SECRET = 'oKJhJsAHyBjAJHbm8#129%@';
const contatos = require('./contatos.json');

app.use(express.json());
app.use(checkPermission);

app.listen(port , () => {
    console.log('Servidor iniciado!');
});

app.post('/login', (req, res) => {
    if(req.body.username === 'paulohenrique' && req.body.password === 'henrique'){
        const id = 1;
        const token = jwt.sign({id} , SECRET );
        res.send({token});
    }else{
        res.status(403).send({message : 'Acesso Negado'});
    }
})

function checkPermission( req, res, next){
    if ( req.path !== '/login' ) {
        const token = req.headers['authorization'];
        if(!token) return res.status(401).send({ message : 'Token não informado'})

        jwt.verify(token, SECRET, function(err, decoded){
            if(err) return res.status(500).send({ message : 'Acesso negado!'})
            req.userId = decoded.id;
            next();
        })
        
    } else {
        next();
    }
}

app.get('/contatos/filtrar' , (req, res) => {
    const queryNome = req.query.nome;
    const contatosFiltrados = contatos.filter(c => c.nome_completo.toLowerCase().includes(queryNome.toLocaleLowerCase()));
    res.send(contatosFiltrados);
})

app.get('/contatos', (req, res) => {
    res.send(contatos)
})
