

var express = require('express');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var app = express();
app.use(bodyParser.json());
 app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/mittens');
var User = mongoose.model('User', {
    username:String,
    password: String
});
var bcrypt= require('bcryptjs');


app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});

var Meow= mongoose.model('Meow', {text:String});

app.get('/meows', function(req, res, next){
  Meow.find({}, function(err, meows) {
    return res.json(meows);
  });
});
app.post('/meows', function(req, res, next){
    var newMeow = new Meow({
        text:req.body.newMeow
    });
    newMeow.save(function(err){
        return res.send("Added Succesfully");
    })
});

app.put('/meows/remove', function(req, res, next){
    console.log("------"+req.body.meow.text);
    var meowId = req.body.meow._id;
    Meow.remove({_id:meowId}, function(err){
        return res.send("Record removd succesfully");
    })
});

app.post('/user', function(req, res, next){
  console.log("-------------------");
    var newUser = new User ({
       username: req.body.username,
       password: req.body.password
    });
    newUser.save(function(err){
      return res.send();
    })
});

app.post('/users', function(req, res, next){	
	bcrypt.genSalt(10, function(err,salt){
		bcrypt.hash(req.body.password,salt,function(err,hash){
			var newUser= new User({
				username: req.body.username,
				password: hash
			});
			newUser.save( function(err){
			return res.send();
	});
		});
	}) ;
});



