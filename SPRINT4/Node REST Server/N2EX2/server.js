const express = require('express');
const path = require('path');
// To use template engine --> hbs (for handlebars) === "Express.js view engine for handlebars.js"
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials', function (err) {});

// View engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Set a static folder
app.use(express.static(path.join(__dirname,'public')));

app.get("/", (req, res) => {
    res.render('index', {titleHeader : 'Home page. Welcome!!'});
});

app.get("/about", (req, res) => {
    res.render('about', {titleHeader : 'About ...!'});
});

app.get('/user', function(req,res){
    const requestedURL = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    res.json({
        name: 'John',
        age: 77,
        requestedURL: requestedURL
    })
});

app.listen(3000,function(){
    console.log("server is running")
});

