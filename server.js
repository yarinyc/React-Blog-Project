const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const data = require ('./data.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
});

app.listen(port, () => console.log(`Listening on port ${port}...`));