const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config();

mongoose.connect(process.env.MONGO, {useMongoClient: true});

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
      avatar: repoObj.owner.avatar_url,
    }

    let newRepo = new Repo(createRepoObj);

    newRepo.save( (err) => {
      counter++;
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

