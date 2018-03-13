const express = require('express');
const morgan = require('morgan');
const {accessLogStream} = require('../log');

const addData = (data) => {
    const app = express();

    app.use(morgan('combined', {stream: accessLogStream}));
    require('./auth').addTo(app);

    require('./router').addTo(app);

    return app;
};

module.exports = {addData};
