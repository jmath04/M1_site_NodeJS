const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const path = require('path');

const users = [
    {
        username: 'joao',
        password: '123'
    }
];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'front')));

app.listen(3000);


app.get('/', function(req,response){
    response.sendFile('index.html');
});

app.post('/registrar', function(req,res){
    const {username, password} = req.body;

    user = users.find( u => ( u.username == username));

    if(user && user.password == password){
        res.redirect('/logado');
    }
    else{
        res.send('usuário ou senha incorretos');
    }
});



