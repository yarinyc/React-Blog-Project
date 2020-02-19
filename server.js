const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

let data = require('./data.json');

//setInterval(()=> data = require('./data.json') , 20000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

app.get('/api/posts', (req, res) => {
	res.send(data);
});

app.post('/api/posts', (req, res) => {
	data.unshift(req.body);
	res.send(req.body);
});

app.delete('/api/posts/:id', (req, res) => {
	const id = parseInt(req.params.id);
	data = data.filter( (post) => post.id !== id );
	res.send({message: "deleted"});
})

app.listen(port, () => console.log(`Listening on port ${port}...`));