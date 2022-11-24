// dependencies
const express = require("express");
const session = require("express-session")
const path = require("path");
const mongoose = require("mongoose");
const config = require('./config/db');



// Express Instance/instantiations
const app = express();

// Database Connection
mongoose.connect(config.database, {useNewUrlParser: true});
const db = mongoose.connection;

// Check for connection
db.once('open', function(){
    console.log('Made a connection Again');
});
// Check for Error
db.on('error', function(err){
    console.error(err);
});

// Configurations
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));


// MiddleWare
// Setting BodyParser
app.use(express.urlencoded({extended: false}));

// Setting static Assets
app.use(express.static(path.join(__dirname,"public")));
app.use("/public/upload", express.static(__dirname + "/public/upload"));
app.use(session({
    resave: true,
    secret:"secret",
    saveUninitialized: true
}));


// Test Route
app.get('/',(req, res)=>{
    res.render("loanForm");
});




app.listen(3007, ()=>{console.log("We are listening to Final Assessment")});