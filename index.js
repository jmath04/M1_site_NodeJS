const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const app = express();

const path = require('path');


const users = [
    {
        username: 'joao',
        password: '123'
    }
];

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000);

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'front','index.html'));
});

app.post('/registrar', function(req,res){
    const {username, password} = req.body;

    user = users.find( u => ( u.username == username));

    if(user && user.password == password){
        req.session.user = {username : user.username};
        res.redirect('/logado');
    }
    else{
        res.send('usuário ou senha incorretos');
    }
});


app.get('/logado',(req,res) =>{
    if(req.session.user){
        res.sendFile(path.join(__dirname,'front','logado.html'));
    }
    else{
        res.redirect('/');
    }
})




