const express = require('express');
const parse = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(parse.json());

app.post('/repos', function (req, res) {
  console.log('post!');

  let user = req.body.user;

  helpers.getReposByUsername(user, (err) => {
    console.log('all repos sent!');
    err ? res.sendStatus(404) : res.sendStatus(201);
  });

});

app.get('/repos', function (req, res) {
  console.log('get!');
  // TODO - your code here!
  db.retrieve( res, (err, results) => {
    err ? res.sendStatus(404) : res.send(JSON.stringify(results));
  });
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

