var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')

const oesuser = require('./routes/oesdb')
const persdb = require('./routes/persdb')
const srpdb = require('./routes/srpdb')
const tiadb = require('./routes/tiasdb')
const umsdb = require('./routes/umsdb')
const userdb = require('./routes/userdb')

var app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.use('/oes', oesuser)
app.use('/pers', persdb)
app.use('/srp', srpdb)
app.use('/tia', tiadb)
app.use('/ums', umsdb)
app.use('/user', userdb)
module.exports = app;