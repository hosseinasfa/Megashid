const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require ('cookie-parser');
const session = require ('express-session');
const mongoose = require ('mongoose');
const flash = require ('connect-flash');


module.exports = class Application {
    constructor () {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(config.port , () => console.log(`Listening on port ${config.port}...`));
    }

    async setMongoConnection(){
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.database.url).then(() => console.log('MongoDB connected'))
            .catch(err => console.log(err));
    }

    setConfig() {
        app.use(express.json()) // for parsing application/json
        app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true }));
        app.use(session({...config.session}));
        app.use(cookieParser(config.cookie_secretKey));
        app.use(flash());

    }

    setRouters() {
        app.use(require('app/routes/api'));
    }

}