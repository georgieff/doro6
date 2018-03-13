
const data = require('./data');
require('dotenv-safe').config();
const {cl} = require('./log');

const port = process.env.port || 3456;
const app = require('./app').addData(data);

app.listen(port, () => {
        console.log(`serving @ ${port}`);
        cl('system', `app started @ ${port}`);
    }
);
