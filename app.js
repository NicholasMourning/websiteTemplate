const express = require('express');
const ejs = require("ejs");

const app = express();

//Configure app
let port = 3000;
let host = "localhost";
app.set('view engine', 'ejs');

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//Routes
app.get('/', (req, res)=>{
    res.render("index");
});

//Errors
app.use((req, res, next) =>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ('Internal Server Error');
    }

    res.status(err.status);
    res.render('error', {error: err});
});

//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})