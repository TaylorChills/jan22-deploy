// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const app = express();

//Handles axios requests
const axios = require('axios')

//Crypto Api
const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "finance-app";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

//Crypto API test
const getCoins = async () => {
    return await axios({
        URL:'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    })
}




// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const portfolioRoutes = require('./routes/portfolio.route')
app.use('/', portfolioRoutes);

const homePageRoutes = require('./routes/home-page.route')
app.use('/', homePageRoutes);

const stocksPageRoutes = require('./routes/stocks-page.route')
app.use('/', stocksPageRoutes);

const cryptoPageRoutes = require('./routes/crypto-page.route')
app.use('/', cryptoPageRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
