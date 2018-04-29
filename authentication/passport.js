//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./user');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-login', new LocalStrategy(
        (email, password, done) => {
            let user = users.find((user) => user.email == email);
            if (user == null) {
                return done(null, false, {
                    message: 'Incorrect credentials.'
                });
            }

            if (user.password === password) {
                return done(null, user);
            }

            return done(null, false, {
                message: 'Incorrect credentials.'
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        let user = users.find((user) => user.id == id);
        if (user == null) {
            done(new Error('Wrong user id.'));
        }

        done(null, user);
    });

    return passport;
};