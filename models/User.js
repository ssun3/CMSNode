const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('meanie-mongoose-to-json');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  email: { type : String, unique: true, lowercase: true }, //ensure uniqueness
  password: String
});

UserSchema.plugin(toJson);

//On Save Hook, encrypt password

//Before saving  a model, run this function
UserSchema.pre('save', function(next){
  //get access to the user model
  const user = this;

  //generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt){
    if (err) {return next(err); }
    //hash our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) { return next(err); }
      
      //overwrite plain text password with encrypted password
      //generated password contains the salt and the hashed password
      user.password = hash;
      next();
    });
  })
});

//makes methods available on user instances
UserSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err);}

    callback(null, isMatch);
  })
}

const User = mongoose.model('user', UserSchema);

module.exports = User;

