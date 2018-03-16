
require('dotenv-safe').config();
const PythonShell = require('python-shell');
const {cl} = require('../log');

const doro = () => {
    return new Promise((resolve, reject) => {
        // IS PROD?
        if (process.env.env==='prod') {
            // TODO
            PythonShell.run(__dirname + './../py/doro.py', (err) => {
                if (err) {
                    cl('error', 'DOOR FAILED! - ' + err);
                    reject(err);
                }
                cl('system', 'PROD - DOOR OPENED!');
                resolve({
                    'door': 'opened',
                    'error': '',
                });
            });
        } else {
            cl('system', 'DEV ENV - OPENING DOOR');
            setTimeout(() => {
                // make it interesting
                resolve({
                    'door': 'opened',
                    'error': '',
                });
            }, 3000);
        }
    });
};

module.exports = doro;
