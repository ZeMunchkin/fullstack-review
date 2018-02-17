const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');


let getReposByUsername = (user, callback) => {
  console.log('helpers function was invoked!');

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

getReposByUsername('ZeMunchkin', err => {
  err ? console.log('Uh-oh, didnt work') : console.log('Yup, it works');
})


module.exports.getReposByUsername = getReposByUsername;
