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


const save = (reposArray, callback) => {
  let counter = 0; 
  reposArray.forEach( (repoObj) => {
    let createRepoObj = {
      repoId: repoObj.id,
      repoName: repoObj.name,
      ownerName: repoObj.owner.login,
      ownerId: repoObj.owner.id,
      url: repoObj.html_url,
      forks: repoObj.forks,
      watchers: repoObj.watchers
    }

    //create variable of repoName & set equal to new Repo with object passed in
    let newRepo = new Repo(createRepoObj);

    //call save method on new repo with callback passed in
    newRepo.save( (err) => {

      err ? callback(err) : console.log('added repo successfully');
      counter++;
      //when last one is successfully added, invoke callback
       if (counter === reposArray.length ) {
        callback();
      }
    });
  });
}

const retrieve = (res, callback) => {

  Repo.find().sort({forks: - 1}).limit(25).exec(callback);
}


module.exports.save = save;
module.exports.retrieve = retrieve;

