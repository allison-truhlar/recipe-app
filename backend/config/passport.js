const LocalStrategy = require("passport-local").Strategy
// const mongoose = require("mongoose")
const User = require("../models/userModel")

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { msg: `Username ${username} not found.` });
        }

        user.comparePassword(password, async (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    try {
      const user = await User.findById(_id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
