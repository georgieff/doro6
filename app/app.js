const express = require('express');
const morgan = require('morgan');
const {accessLogStream} = require('../log');

const addData = (data) => {
    const app = express();

    app.use(morgan('combined', {stream: accessLogStream}));

    app.set('view engine', 'twig');
    app.set('views', __dirname + './../views');

    app.use('/assets',
        express.static( __dirname + './../assets'));
    app.use('/axios',
        express.static( __dirname + './../node_modules/axios/dist'));
    app.use('/favicon.ico',
        express.static( __dirname + './../favicon.ico'));

    require('./auth').addTo(app);
    require('./router').init(app, data);

    return app;
};

module.exports = {addData};
