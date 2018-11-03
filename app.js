let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

//mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
let campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

let Campground = mongoose.model("Campground", campgroundsSchema);

// Campground.create(
//   {
//     name:"Granite Hill",
//     image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=42b2e0af84cb66075cdfc0957f140652&auto=format&fit=crop&w=500&q=60",
//     description: "Huge hill, no bathrooms, no water, beautiful granite!"
//   }, 
//   function(err, campground) {
//     if (err) console.log(err)
//     else console.log(campground)
//   });

app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) console.log(err);
    else res.render("index", {campgrounds: allCampgrounds});
  });
});

// CREATE
app.post("/campgrounds", function(req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = {name:name, image:image, description:description};
  
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err)
    } 
    else {
      res.redirect("/campgrounds");
    }
  })
});

// NEW
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// SHOW
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) console.log(err)
    else {
      res.render("show", {campground: foundCampground})
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp Server has started");
});