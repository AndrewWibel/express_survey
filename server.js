var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render("index");
})

app.post('/result', function(req, res){
	user_info = {
		name: req.body.name,
		location: req.body.location,
		language: req.body.language,
		comments: req.body.comments
	};
	res.render("result",{survey: user_info});
})




var server =app.listen(8000, function(){
	console.log("listening on port 8000!")
})

var io = require('socket.io').listen(server)
	
io.sockets.on('connection', function(socket){
	console.log("SOCKETS ARE WORKING!");

	socket.on("posting_form", function(data){
		console.log("the user info is: " + data);
		socket.emit('updated_message', {data});
	})




})