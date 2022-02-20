const router = require('express').Router();

//Crypto API
const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko();



router.get('/crypto-page', (req, res, next) => {
    res.render('crypto-page')
});





module.exports = router;

