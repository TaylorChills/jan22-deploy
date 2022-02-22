const router = require('express').Router();
const axios = require('axios');
const async = require('hbs/lib/async');
const Crypto = require('../models/crypto.model');

//Api link
async function getCoins() {
    try{
    let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
    let data = await response.data;
      console.log(data)
      return data
    }catch(err) {
      console.log(err)
    }
  }
  

router.get('/portfolio', async(req, res, next) => {
    let data = await getCoins()

    res.render('portfolio', {data})
});


router.post('/portfolio/:id/add', (req, res, next) => {
    const {id, quantity} = req.body;

    Crypto.create({id, quantity})
    .then((createdCrypto) => {
        console.log('createdCrypto', id);
        res.redirect('/portfolio');
    })
    .catch((err) => next(err));
})


module.exports = router;