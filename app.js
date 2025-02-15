const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));

const ROUTER = require('./Router/allRouter')             //after import Router or other file app.use(ROUTER)  must be write in the end to use it here
// app.use(ROUTER) this must be write in the end 



const port = 3000;

app.set('view engine', 'ejs'); // this to use the ejs file

app.use(express.static('public')); // this to use the css and js and images and other files

app.use(express.json()); // for parsing application/json

// this for the method-override to use the delete method in the form
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
// end this

// above is the code for the connection to the database and the server and other things


// below is the code for the auto-reload to the page
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
const { devNull } = require('os');
// here if not add const moment above must add it here
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
// end of the auto-reload code


// this for connect with database
mongoose
    .connect("mongodb+srv://saeedmohamedeid617:cdvjTFi1eOQTRqNI@cluster0.9zvkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
// end this


app.use(ROUTER) 



// npm run watch -> to run the server and the database