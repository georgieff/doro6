const express = require('express');
const morgan = require('morgan');
// REVAMP
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const addData = (data) => {
    const app = express();
    // TODO REVAMP
    const logDirectory = path.join(__dirname, 'logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    const accessLogStream = rfs('access.log', {
        interval: '1d', // rotate daily
        path: logDirectory,
    });
    app.use(morgan('combined', {stream: accessLogStream}));
    // END REVAMP

    require('./auth').addTo(app);

    require('./router').addTo(app);

    return app;
};

module.exports = {addData};
