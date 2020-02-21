const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

let data = require('./data.json');
let users = require('./users.json');
let meta = {loggedIn: false, admin: false };

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

//apply search terms:
const applySearch = (search) => {
	return data.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) ||
							   post.content.toLowerCase().includes(search.toLowerCase()));
}

app.get('/api/init',(req,res) => {
	res.send({loggedIn: meta.loggedIn, admin: meta.admin});
});

// user related requests:
app.put('/api/users/login', (req, res) => {
	const {userName, password} = req.body;
	const currUser = users.find( u => u.userName === userName);
	if(currUser === undefined){
		res.send({message: "failed"})
		return;
	}
	if(currUser.password !== password){
		res.send({message: "failed", admin: currUser.admin})
		return;
	}
	let updatedUser = currUser;
	updatedUser.loggedIn = true;
	users = users.map( u => u === currUser ? updatedUser : u)
	meta = updatedUser;
	res.send({message: "success", admin: currUser.admin, userName: userName});
});

app.post('/api/users/register', (req,res) => {
	const registrationData = req.body;
	const currUser = users.find( u => u.userName === registrationData.userName);

	if(currUser !== undefined){
		res.send({message: "failed"})
		return;
	}

	// jsonObj = JSON.stringify(registrationData);
	// fs.writeFile('users.json', json, 'utf8');

	// fs.readFile('users.json', 'utf8', function readFileCallback(err, data){
	// 	if (err){
	// 		console.log(err);
	// 	} else {
	// 	obj = JSON.parse(data); //now it an object
	// 	obj.table.push(registrationData); //add some data
	// 	newJsonData = JSON.stringify(obj); //convert it back to json
	// 	fs.writeFile('users.json', newJsonData, 'utf8', callback); // write it back 
	// }});

	users.push(registrationData);
	res.send({message: "success"});

});

app.put('/api/users/logout', (req, res) => {
	const {userName} = req.body;
	console.log("USERNAME IS:",userName);
	const currUser = users.find( u => u.userName === userName);
	console.log("USER OBJECT IS: ",currUser);
	if(currUser === undefined){
		res.send({message: "failed"})
		return;
	}
	
	let updatedUser = currUser;
	updatedUser.loggedIn = false;
	users = users.map( u => u === currUser ? updatedUser : u);
	console.log("TEST ", users);
	meta = updatedUser;
	res.send({message: "success"});
});

// post related requests:
app.get('/api/posts', (req, res) => {
	const search = req.query.search || '';
	const filteredData = applySearch(search);
	res.send(filteredData);
});

app.post('/api/posts', (req, res) => {
	// console.log(req.body);
	data.unshift(req.body);
	res.send({message: "success" ,addedPost: req.body});
});

app.delete('/api/posts/:id', (req, res) => {
	const id = parseInt(req.params.id);
	data = data.filter( (post) => post.id !== id );
	res.send({message: "deleted"});
})

app.listen(port, () => console.log(`Listening on port ${port}...`));