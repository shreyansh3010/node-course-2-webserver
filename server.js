const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

var port = process.env.port || 3000; 

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('sever.log',log+'\n',(e)=>{
        if(e){
            console.log('error');
        }
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintain');
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle:'home page',
        welcome:'Welcome to node.js'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page'
    });
});


app.get('/name',(req,res)=>{
    res.send({
        name:'shreyansh',
        sirname:'Jain'
    });
});

app.listen(port,()=>{
    console.log('Server is up on port '+port);
});