var express = require('express')
  , http = require('http')
  , path = require('path')
  , controller = require ('./routes/controller');
var cors = require('cors');
var morgan = require('morgan')
var bodyParser = require('body-parser');  
var sessions = require("client-sessions");


var app = express();

//Enable CORS
app.use(cors());

app.use(morgan('dev')) ; 


app.use(sessions({
	  cookieName: 'mySession',
	  secret: 'blargadeeblargblarg',
	  duration: 10 * 60 * 1000, 
	  activeDuration: 5 * 60 * 1000 
	}));





app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

controller(app) ; 


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
