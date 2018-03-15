const bodyParser = require('body-parser');
const passport = require('passport');
const {cl} = require('../log');
const userModel = require('./userModel');

const addTo = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/', (req, res) => {
        res.render('index', {
            model: userModel(req.user),
        });
    });

    app.get('/fb', passport.authenticate('facebook'));

    app.get(
        '/fb/callback',
        passport.authenticate('facebook', {failureRedirect: '/'}),
        (req, res) => {
            // Successful authentication, redirect home.
            let m = 'SUCC auth user '
            + req.user.displayName
            + ' with id '
            + req.user.id;
            cl('auth', m);
            res.redirect('/');
        }
    );

    app.get('/logout', (req, res) => {
        let m = 'SUCC logout user '
        + req.user.displayName
        + ' with id '
        + req.user.id;
        cl('logout', m);
        req.logout();
        req.session.destroy();
        res.redirect('/');
    });

    /*
        TODO:
        app.post('/api/checkpost', (req, res) => {
            const body = req.body;
            console.log('request detected');
            console.log(body);
            res.status(201)
                .send(true);
        });
    */

    app.get('*', (req, res) => {
        res.status(404)
        .render('404', {
            model: {title: 'not found'},
        });
    });
};

module.exports = {addTo};
