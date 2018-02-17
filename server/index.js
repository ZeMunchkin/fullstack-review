const express = require('express');
const parse = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');
require('dotenv').config();

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(parse.json());

app.post('/repos', function (req, res) {
  let user = req.body.user;

  helpers.getReposByUsername(user, (err) => {
    err ? res.sendStatus(404) : res.sendStatus(201);
  });
});

app.get('/repos', function (req, res) {
  db.retrieve( res, (err, results) => {
    err ? res.sendStatus(404) : res.send(JSON.stringify(results));
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

