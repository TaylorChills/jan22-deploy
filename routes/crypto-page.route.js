const axios = require('axios');
const router = require('express').Router();
const Crypto = require('../models/crypto.model')
const async = require('hbs/lib/async');

//Crypto API
const CoinGecko = require('coingecko-api');
//const { response } = require('../app');
const CoinGeckoClient = new CoinGecko();




  router.get('/crypto-add/:id', (req, res, next) => {
    const {id} = req.params
    res.render('crypto-add', {id})
});

  /* router.post('/crypto-add/:id', (req, res, next) => {
    const {id} = req.params 

    Crypto.create({id, quantity})
      .then((newCoin) => {
        console.log('coin added', newCoin)
        res.redirect('/');
      });
  }); */


module.exports = router;

