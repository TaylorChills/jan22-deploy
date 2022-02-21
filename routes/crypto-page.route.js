const router = require('express').Router();
const Crypto = require('../models/crypto.model')

//Crypto API
const CoinGecko = require('coingecko-api');
//const { response } = require('../app');
const CoinGeckoClient = new CoinGecko();

 

async function getCoins() {
    try{
    let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false');
    let data = await response.data;
      console.log(data)
      return data
    }catch(err) {
      console.log(err)
    }
  }


router.get('/crypto-page', async(req, res, next) => {
    res.render('crypto-page')
});





module.exports = router;

