
var express    	= require("express"),
    app        	= express(),
    bodyParser 	= require("body-parser"),
    mongoose   	= require("mongoose"),
    Campground 	= require("./models/campground"),
    Comment 	= require("./models/comment"),
    seedDB		= require("./seeds");

seedDB();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

app.get("/", function(req, res){
	res.render("landing");
});

app.get('/campgrounds', function(req, res){
	    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

app.post('/campgrounds', function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("campgrounds/index");
        }
    });
});

app.get('/campgrounds/new', function(req, res){
	res.render('campgrounds/new');
});

app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {camp: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){console.log(err);}
        else
        {
            res.render('comments/new', {campground: camp});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req,res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            Comment.create(req.body.comment, function(err, comment){
                if(err){console.log(err);}
                else
                {
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect('/campgrounds/' + camp._id);
                }
            });
        }
    });
});

app.listen(3000, function(){
	console.log("Yelp Camp Active.");
});