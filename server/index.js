const express = require('express');
const parse = require('body-parser');
const helpers = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(parse.json());

app.post('/repos', function (req, res) {
  console.log('post!');

  let user = req.body.user;

  helpers.getReposByUsername(user, res, (err) => {
    err ? res.sendStatus(404) : res.sendStatus(201);
  });

});

app.get('/repos', function (req, res) {
  console.log('get!');
  // TODO - your code here!
  
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

