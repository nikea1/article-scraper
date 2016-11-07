var express = require('express');
var exphbs = require('express-handlebars');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var request = require('request');
var bodyParser = require('body-parser')

var app = express();

var port = process.env.PORT || 3000;
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connect("mongodb://localhost/week18hw");
var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// And we bring in our Note and Article models
var Note = require('./models/Note.js');
var Article = require('./models/Article.js');

//scrape articles
app.get("/scrape", function(req, res){

	//TODO: Pick another site after fuctions are working
	request('http://www.echojs.com/' ,function(error, response, html){
		var $ = cheerio.load(html)

		console.log(html);

		$('article h2').each(function(i, element){
			// save an empty result object
				var result = {};

				// add the text and href of every link, 
				// and save them as properties of the result obj
				result.title = $(this).children('a').text();
				result.link = $(this).children('a').attr('href');

				console.log(result.title);
				console.log(result.link);

				var article = new Article(result)

				article.save(function(err, docs){
					if(err)
						console.log(err);
					else
						console.log(docs);
				})
		});


	})

	res.send("Scrape Complete");
})


//get all articles in database
app.get("/article", function(req, res){
	Article.find({}, function(err, docs){
		if(err)
			res.send(err)
		else
			res.send(docs)
	})
})

//get article in database
app.get("/article/:id", function(req, res){
	var articleId = req.params.id;

	Article.findOne({where:{_id:articleId}})
		.populate("note")
		.exec(function(err, docs){
			if(err)
				res.send(err)
			else
				res.send(docs)
		})

})

//push note
app.post("/article/:id", function(req, res){
	var note = req.body;
	console.log(note);
	Note.create(note, function(err, note){
		Article.findOneAndUpdate({"_id": req.params.id},{$set:{'note': note._id}})
	})
})


app.use("/", function(req,res){})


app.listen(port, function(){
	console.log("Im running on port", port);
})