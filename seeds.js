var mongooose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var comment = {
	text: "is aight. 3/7",
	author: "generic"
}

var data = 
	[
		{
			name: "Sylvan Lake", 
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTF7IdQ_DXtz-NbJRJuebNfNhx7nhCBkqJi6y_5ENgNQeLB_f",
			description: "By Red Deer, more or less.",
		},
		{
			name: "Green Hill", 
			image: "https://bearlake.org/wp-content/uploads/cache/images/garden-city-logan-campgrounds/garden-city-logan-campgrounds-987998613.jpg",
			description: "From Sonic.",

		},
		{
			name: "Horseshoe Bay", 
			image: "https://bearlake.org/wp-content/uploads/cache/images/bear-lake-koa-campground/bear-lake-koa-campground-2672047940.jpg",
			description: "Down by the bay.",
		}
	];

function seedDB(){
	Comment.remove({}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Comments Deleted");
		}
	});
	
	Campground.remove({}, function(err){
		if(err){
			console.log(err)
		}else{
			data.forEach(function(seed){
				Campground.create(seed, function(err, camp){
					if(err){console.log(err)}
					else {
						Comment.create(comment, function(err, comment){
							if(err){console.log(err)}
							else{
								camp.comments.push(comment);
								camp.save();
							}
						})
					}
				})
			})
		}
	});
}

module.exports = seedDB;