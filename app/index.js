const express = require('express');
const app = express();
const http = require('http');
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
dotenv.config();


module.exports = class Application {
    constructor () {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    


    setupExpress() {
        const server = http.createServer(app);
        server.listen(process.env.APPLICATION_PORT , () => console.log(`Listening on port ${process.env.APPLICATION_PORT}...`));

        
    }

    async setMongoConnection(){
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DATABASE_URL).then(() => console.log('MongoDB connected'))
            .catch(err => console.log(err));
    }

    setConfig() {
        app.use(express.json()) // for parsing application/json
        app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    }

    setRouters() {
        app.use(require('app/routes/api'));
    }

}