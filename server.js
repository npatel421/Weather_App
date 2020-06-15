const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website')); 

const port = 8001; // set up name of port

const server = app.listen(port,listening); //use .listen to assign port to the app and call the callback function. 

function listening() {
    console.log("server is running");
    console.log(`the server port is ${port}`);
};

let projectData = {};

app.post('/post', postData);

function postData(req,res) {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;

  console.log(projectData)
}

app.get('/get', getData);

function getData(req,res) {
  res.send(projectData)
}