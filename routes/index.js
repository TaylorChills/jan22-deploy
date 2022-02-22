
const axios = require('axios');
const async = require('hbs/lib/async');
//const { response } = require('../app');

const router = require("express").Router();
const User = require('../models/User.model')
const Crypto = require('../models/crypto.model');
const res = require('express/lib/response');

//Api link for coin gecko
async function getCoins() {
  try{
  let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
  let data = await response.data;
    //console.log(data)
    return data
  }catch(err) {
    console.log(err)
  }
}

/* GET home page */
router.get("/", async(req, res, next) => {
  let data = await getCoins()
  
  res.render("index", {data});
});


//link to info page
router.get("/crypto-info/:id", async(req, res, next) => {
  const {id} = req.params
  let response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  let data = response.data;
  //console.log(data)
  res.render("crypto-page", data);
  });

  

  router.post('/crypto-add', (req, res, next) => {
    console.log(req.body)
    const {name, quantity} = req.body;
    
    Crypto.create({name, quantity})
    .then((coinAdd) => {
      return User.findByIdAndUpdate(req.session.user._id, {$push: { coins: coinAdd._id}} )
    })
    .then(() => res.redirect('/'))
    .catch((err) => next(err));
  })


  








module.exports = router;
















/* router.get('/crypto-add/:id', (req, res, next) => {
    const {id} = req.params
    res.render('crypto-add', {id})
}); */