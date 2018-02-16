var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

module.exports = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	[
// 		{
// 			name: "Sylvan Lake", 
// 			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTF7IdQ_DXtz-NbJRJuebNfNhx7nhCBkqJi6y_5ENgNQeLB_f",
// 			description: "By Red Deer, more or less."
// 		},
// 		{
// 			name: "Green Hill", 
// 			image: "https://bearlake.org/wp-content/uploads/cache/images/garden-city-logan-campgrounds/garden-city-logan-campgrounds-987998613.jpg",
// 			description: "From Sonic."
// 		},
// 		{
// 			name: "Horseshoe Bay", 
// 			image: "https://bearlake.org/wp-content/uploads/cache/images/bear-lake-koa-campground/bear-lake-koa-campground-2672047940.jpg",
// 			description: "Down by the bay."
// 		}
// 	]
// );
