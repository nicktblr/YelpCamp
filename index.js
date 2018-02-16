var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Swamp", image: "https://static1.squarespace.com/static/57a33100579fb3f47b0e4f5f/57c33c569f745643297c9a2b/57c33c568419c2d24d5e3839/1472412848948/Campsite7.jpg"},
		{name: "Spooky Lake", image: "https://media-cdn.tripadvisor.com/media/photo-s/05/c6/94/80/red-squirrel-campsite.jpg"},
		{name: "Sylvan Lake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTF7IdQ_DXtz-NbJRJuebNfNhx7nhCBkqJi6y_5ENgNQeLB_f"}
	];

app.get("/", function(req, res){
	res.render("landing");
});

app.get('/campgrounds', function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.listen(3000, function(){
	console.log("Yelp Camp Active.");
});