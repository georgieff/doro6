const bodyParser = require('body-parser');
const passport = require('passport');
const {cl} = require('../log');
const userModel = require('./userModel');

const init = (app, data) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/', (req, res) => {
        res.render('index', {
            model: userModel(req.user, data),
        });
    });

    app.get('/fb', passport.authenticate('facebook'));

    app.get('/fb/callback',
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
        const m = 'SUCC logout user '
        + req.user.displayName
        + ' with id '
        + req.user.id;
        cl('logout', m);
        req.logout();
        req.session.destroy();
        res.redirect('/');
    });

    app.post('/api/doro6', require('connect-ensure-login').ensureLoggedIn(),
        (req, res) => {
            const user = userModel(req.user, data);
            if (!user.hasPermission) {
                const m = 'INVALID request - user'
                + req.user.displayName
                + ' with id '
                + req.user.id
                + ' to open the door';
                cl('error', m);
                res.status(403).json({
                    'error': 'forbidden',
                });
            }
            const m = 'POST from '
            + req.user.displayName
            + ' with id '
            + req.user.id
            + ' to open the door';
            cl('post', m);

            const doro = require('./doro')();
            doro.then((result) => {
                res.status(204).send();
            }, (err) => {
                res.status(202).json({'error': err});
            });
    });

    app.get('*', (req, res) => {
        res.status(404)
        .render('404', {
            model: {title: 'not found'},
        });
    });
};

module.exports = {init};
