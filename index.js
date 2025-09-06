const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

const users = [
    {
        username: 'joao',
        password: '123'
    },
    {
        username: 'scheila',
        password: '456'
    }
];

app.use(cookieParser());

app.use(session({
    secret: 'scheila77',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if(!req.session.user && req.cookies.user) {
        req.session.user = {username: req.cookies.user};
    }
    next();
})

app.use(express.static(path.join(__dirname, 'front')));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    if (req.session.user) {
        return res.redirect('/logado');
    }
    res.sendFile(path.join(__dirname,'front','index.html'));
});

app.post('/registrar', function(req,res){
    const {username, password, remember} = req.body;

    const user = users.find( u => u.username === username);

    if(user && user.password === password){
        req.session.user = {username : user.username};

        if (remember) {
            res.cookie('user', user.username, {maxAge: 3*24*60*60*1000, httpOnly: false, sameSite: 'lax', path: '/'});
        }

        res.redirect('/logado');
    }
    else {
        res.cookie('loginError', '1', {maxAge: 2000});
        return res.redirect('/');
    }
});


app.get('/logado',(req,res) =>{
    if(req.session.user) {
        return res.sendFile(path.join(__dirname,'front','logado.html'));
    }
    else{
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('user');
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});



