const axios = require("axios");
const router = require("express").Router();
const Crypto = require("../models/crypto.model");
const async = require("hbs/lib/async");

//Crypto API
const CoinGecko = require("coingecko-api");
//const { response } = require('../app');
const CoinGeckoClient = new CoinGecko();

module.exports = router;
