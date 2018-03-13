const bodyParser = require('body-parser');
const passport = require('passport');
const {cl} = require('../log');

const addTo = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/', (req, res) => {
        res.send('<a href="/fb">login</a>' + (req.user ? req.user.name : '') );
    });

    app.get('/fb', passport.authenticate('facebook'));

    app.get(
        '/fb/callback',
        passport.authenticate('facebook', {failureRedirect: '/login'}),
        (req, res) => {
            // Successful authentication, redirect home.
            let m = 'SUCC auth user '
            + req.user.displayName
            + ' with id '
            + req.user.id;
            cl('auth', m);
            res.redirect('/profile');
        }
    );

    app.get('/api/checkpost', (req, res) => {
        res.send({
            id: 1,
            name: 'asd',
        });
    });

    app.post('/api/checkpost', (req, res) => {
        const body = req.body;
        console.log('request detected');
        console.log(body);
        res.status(201)
            .send(true);
    });

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

    app.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
        (req, res) => {
            res.send('profile ' + req.user.displayName +
             ` <img src="${req.user.photos[0].value}" />` + '<br>'
            + '<a href="/logout">logout</a>');
    });

    app.get('*', (req, res) => {
        res.status(404)
        .send('404');
    });
};

module.exports = {addTo};
