const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = mongoose.Schema({

  repoId: {type: Number, required: true, unique: true},
  repoName: String,
  ownerName: String,
  ownerId: Number,
  url: String,
  forks: Number,
  watchers: Number

});

repoSchema.plugin(uniqueValidator);

const Repo = mongoose.model('Repo', repoSchema);


const save = (reposArray, callback, res) => {
  console.log('first line in save', typeof callback);

  reposArray.forEach( (repoObj, index) => {
    let createRepoObj = {
      repoId: repoObj.id,
      repoName: repoObj.name,
      ownerName: repoObj.owner.login,
      ownerId: repoObj.owner.id,
      url: repoObj.url,
      forks: repoObj.forks,
      watchers: repoObj.watchers
    }

    //create variable of repoName & set equal to new Repo with object passed in
    let newRepo = new Repo(createRepoObj);

    //call save method on new repo with callback passed in
    newRepo.save( (err, callback) => {
      console.log('inside newRepo.save', typeof callback);

      err ? callback(err) : console.log('added repo successfully');

      //when last one is successfully added, invoke callback
      if (index === reposArray.length - 1) {
        callback();
      }
    });
  });
}

const retrieve = () => {
  Repo.find().limit(25).sort({watchers: -1}).exec((err, results) => {
    err ? console.log('Nope, didnt work') : console.log('SUCCESS!!', results);
  });
}



retrieve();

module.exports.save = save;
module.exports.retrieve = retrieve;

