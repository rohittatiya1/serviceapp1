/*Define depemdencies*/
var express  = require('express'),
    app      = express();
    nodemailer = require("nodemailer"),
    path     = require('path'),
    bodyParser = require('body-parser'),
   // jwt = require('express-jwt'),
    //dotenv = require('dotenv'),
    http = require('http'),
    cors = require('cors'),
    expressValidator = require('express-validator');


/*dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});*/

/*app use*/
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors()); //to allow origins
/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(
 
    connection(mysql,{
        host     : 'devbms.cnwx0gkwkd5w.ap-southeast-1.rds.amazonaws.com',
        user     : 'devbms_userInst',
        password : 'U8X#pAwWR!M8',
        port     : '3306',
        database : 'g2gmobile_db',
        multipleStatements: true,
        debug    : false //set true if you wanna see debug logger
    },'request')

);


/*
    Your middlewares or setups usually around here
*/



//API Router
var router = express.Router();// calling the outside routes 
var index = require('./routes/index').router;

app.all('/*', function(req, res, next) {
  next();
});


app.use('/api',index);





/*
app.use('/secured',authenticate);
app.get('/secured/pass',function(req,res,next)
    {
       res.send('Welcome tp mobile service api passs with secured');
    });*/

/*
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
var server =app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
*/
//http://mycoolserver.com:9001


//start Server
var server = app.listen(process.env.PORT || 5000,function(){
 
   console.log("Listening to port %s",server.address().port);
});
