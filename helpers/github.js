const request = require('request');
const db = require('../database/index.js');
require('dotenv').config();


let getReposByUsername = (user, callback) => {

  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'method': 'GET',
      'Authorization': `token ${process.env.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request(options, (err, response, body) => {
    if (err) {
      callback(err);
    } else {
      db.save(JSON.parse(body), callback);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;
