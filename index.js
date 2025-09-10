const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');


const app = express();

const users = [
    {
        username: 'joao',
        password: '123'
    }
];

app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});

app.get('/', function(req,res){
    if(req.cookies.currentUser){
        return res.redirect('/logado');
    }
    res.sendFile(path.join(__dirname,'front','index.html'));
});

app.use(express.static(path.join(__dirname,'front')));

app.post('/login', function(req,res){
    const {username, password, manter} = req.body;

    const user = users.find( u => u.username === username);

    if(user && user.password === password){
        if(manter === 'on'){ 
            res.cookie('currentUser', user.username, {maxAge: 1000 * 60 * 60 * 24 * 3});
        }else{
            res.cookie('currentUser', user.username);
        }
        return res.redirect('/logado');
    }
    else{
        res.cookie('loginError', '1', { maxAge: 5000 });
        res.redirect('/');
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

app.get('/get-username', (req,res) =>{
    if(req.cookies.currentUser){
        res.json({username: req.cookies.currentUser});
    }else{
        res.status(401).json({error: 'Usuário não autenticado'});
    }
})

app.get('/logout', (req,res) =>{
   res.clearCookie('currentUser');
   res.redirect('/');
})