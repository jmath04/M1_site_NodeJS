const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookies = require('cookies')

const app = express();

const path = require('path');


const users = [
    {
        username: 'joao',
        password: '123'
    }
];

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.listen(3000);

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'front','index.html'));
});

// teste
// teste 2

app.post('/registrar', function(req,res){
    const {username, password} = req.body;

    user = users.find( u => ( u.username == username));

    if(user && user.password == password){
        res.cookie('currentUser',user.username, {maxAge:90000000});
        res.redirect('/logado');
    }
    else{
        res.send('usuário ou senha incorretos');
    }
});


app.get('/logado',(req,res) =>{
    if(req.cookies.currentUser){
        res.sendFile(path.join(__dirname,'front','logado.html'));
    }
    else{
        res.redirect('/');
    }
})


