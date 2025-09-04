const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookies = require('cookies')

const app = express();

const path = require('path');
const Cookies = require('cookies');


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
    if(req.cookies.currentUser){
        res.redirect('/logado');
    }
    res.sendFile(path.join(__dirname,'front','index.html'));
});

app.post('/login', function(req,res){
    const {username, password, manter} = req.body;

    const user = users.find( u => ( u.username == username));

    if(user && user.password == password){
        if(manter === 1){
            res.cookie('currentUser',user.username, {maxAge: 259200});
            res.redirect('/logado');
        }else{
            res.cookie('currentUser',user.username);
            res.redirect('/logado');
        }
    }
    else{
        res.send('usuário ou senha incorretos');
    }
});


app.get('/logado',(req,res) =>{
    if(req.cookies.currentUser){
        const nome = req.cookies.currentUser;
        res.send(
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Logado</title>
            </head>
            <body>
            <h1>Ola ${nome} você está logado</h1>    
            <form action='/logoff' id="logoff" method="post">
            logoff
            <button type="subimit" id="logoff">
            </form>
            </body>
            </html>
            `
        );
    }
    else{
        res.redirect('/');
    }
})

app.all('/logoff', (req,res) =>{
   res.clearCookie('currentUser');
   res.redirect('/');
})


