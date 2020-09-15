var fs = require('fs');
var data = fs.readFileSync('furnitures.json');
var elements = JSON.parse(data);
const express = require("express");
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Start at 5000 Port", PORT));

app.use(express.static('public'));
app.use(cors());
app.get('/furnitures', alldata);
function alldata(request, response) {
	if (Object.keys(elements).length > 0) {
		response.send(elements);
	}
	else {
		response.send({ error: "404 Not Found" });
	}

}
app.get('/furnitures/:furnitureName/', searchElement);
function searchElement(request, response) {
	var word = request.params.furnitureName;
	word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	if (elements[word]) {
		var reply = elements[word];

	}
	else {
		var reply = {
			status: "Not Found"
		}
	}
	response.send(reply);

}

