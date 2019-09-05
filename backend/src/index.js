require('dotenv').config();

const app = require('./app');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./db');

app.use(cookieParser());

async function main() {
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();