const database = require('./database');

module.exports = {
    database,
    port : process.env.APPLICATION_PORT,
    cookie_secretKey : process.env.COOKIE_SECRETKEY,
    debug : true,
    siteurl : process.env.WEBSITE_URL,
    jwt : {
        secret_key : 'fas#$GhHff89dS&!L'
    }
}