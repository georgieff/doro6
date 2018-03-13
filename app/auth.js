const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
require('dotenv-safe').config();

passport.use(new FacebookStrategy({
        clientID: process.env.fb_id,
        clientSecret: process.env.fb_secret, // seccret
        callbackURL: 'http://localhost:3456/fb/callback',
        profileFields: ['id', 'displayName', 'photos'],
    },
        (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile);
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

const addTo = (app) => {
    app.use(cookieParser());

    app.use(expressSession({
        secret: 'd1no miata',
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = {addTo};
