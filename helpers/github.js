const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');


let getReposByUsername = (user, callback) => {

  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'method': 'GET',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request(options, (err, response, body) => {

    if (err) {
      callback(err)
    } else {
      db.save(JSON.parse(body), callback);
    
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;
