let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=800&q=60"},
    {name: "Granite Hill", image:"https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=800&q=60"},
    {name: "Mountain Goat Rest", image:"https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=800&q=60"},
    {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=800&q=60"},
    {name: "Granite Hill", image:"https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=800&q=60"},
    {name: "Mountain Goat Rest", image:"https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=800&q=60"}
  ];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name, image:image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp Server has started");
});