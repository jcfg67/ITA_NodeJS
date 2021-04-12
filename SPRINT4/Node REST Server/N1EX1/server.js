const express = require('express');

const app = express();

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

