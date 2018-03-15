const express = require('express');
const morgan = require('morgan');
const {accessLogStream} = require('../log');

const addData = (data) => {
    const app = express();

    app.use(morgan('combined', {stream: accessLogStream}));

    app.set('view engine', 'twig');
    app.set('views', __dirname + './../views');

    require('./auth').addTo(app);
    require('./router').addTo(app);

    return app;
};

module.exports = {addData};
