var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  var generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
  };

  var isValidPassword = function(userpass, password) {
    return bCrypt.compareSync(password, userpass);
  };

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        User.findOne({ where: { username: username } }).then(user => {
          if (user) {
            return done(null, false, { message: "Username is already taken" });
          } else {
            const password = generateHash(req.body.password);
            const data = {
              username: username,
              password: password,
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };

            User.create(data).then((newUser, created) => {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        console.log("in here!!");
        User.findOne({ where: { username: username } })
          .then(user => {
            console.log(user.dataValues);

            if (!user) {
              return done(null, false, { message: "User does not exist." });
            } else if (!isValidPassword(user.dataValues.password, password)) {
              return done(null, false, { message: "Incorrect password." });
            }
            const userInfo = user.get();
            console.log(userInfo);
            return done(null, userInfo);
            
          })
          .catch(err => {
            console.log(err);
            return done(null, false, { message: "Something went wrong." });
          });
      }
    )
  );
};
