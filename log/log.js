const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

// TODO REVAMP
let dt = new Date();
let month = ((dt.getMonth() < 9) ? '0' : '') + (dt.getMonth() + 1);
let filename = `${month}-${dt.getDate()}-${dt.getFullYear()}.log`;
let logDirectory = path.join(__dirname, '../logs/');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs(filename, {
    interval: '1d', // rotate daily
    path: logDirectory,
});

const cl = (type, message) => {
    let date = new Date();
    let m = `---CL [${type}] | ${date} | ${message} \n`;
    accessLogStream.write(m, () => {
        console.log(`[${type}] log added.`);
    });
};

module.exports = {
    accessLogStream,
    cl,
};
