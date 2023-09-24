const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const User = require("../models/userModel")

module.exports = function (passport) {
    passport.use(
      new LocalStrategy((username, password, done) => {
        User.findOne({username}, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { msg: `Username ${username} not found.` });
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { msg: "Invalid email or password." });
          });
        });
      })
    );
  
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
  
    passport.deserializeUser((_id, done) => {
      User.findById(_id, (err, user) => done(err, user));
    });
  };