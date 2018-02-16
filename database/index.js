const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// new is between comments
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We\'re connected!');
})
// end

let repoSchema = mongoose.Schema({
  // TODO: your schema here!

  gitHubId: Number,
  repoName: String,
  ownerName: String,
  ownerId: Number,
  url: String,
  forks: Number,
  watchers: Number

});

let Repo = mongoose.model('Repo', repoSchema);


let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;