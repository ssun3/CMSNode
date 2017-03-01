const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  //verify this email and password, call done with the user if it is correct
  //otherwise call done with false

  User.findOne({ email: email}, function(err, user){
    if (err) {return done(err); }
    if(!user) {return done(null, false);}

    //compare passwords - is 'password' equal to user.password?'
    user.comparePassword(password, function(err, isMatch){
      if (err) { return done(err);}
      if (!isMatch) { return done(null, false);}

      return done(null, user);
    });
  });

});

//setup options for JWT strategy
const jwtOptions = {
  //tell jwt where to look to find jwtToken-- tell it to look at a header called authorization
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //payload = decoded JWT token userid and timestamp that we created earlier.

  //See if the userID in the payload exists in our database. 
  //If it does, call 'done' with that user object
  // otherwise, call done without a user object

  User.findById(payload.sub, function(err, user){
    if (err) { return done(err, false);}

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }

  });
});
//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
