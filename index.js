var http = require('http');

var words = ["spoon", "flake", "loops"];

var app = http.createServer(function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	res.setHeader('Content-Type', 'application/json');
	
	var wordOfTheDayIndex = Math.floor(Math.random() * words.length);
	
	if(req.url == '/WordOfTheDay' && req.method == 'GET') {
		res.end(JSON.stringify({"Word": words[wordOfTheDayIndex].toUpperCase().split("") }));
	}
})

app.listen(8080, () => {
	console.log("Server has started listening on port 8080");
});