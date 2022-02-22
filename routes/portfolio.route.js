const router = require('express').Router();
const axios = require('axios');
const async = require('hbs/lib/async');
const Crypto = require('../models/crypto.model');
const User = require('../models/User.model');

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
   
   try {
    let data = await getCoins()
    //console.log(data)
    let user = await User.findById(req.session.user._id).populate('coins')
    console.log(user)


    let coinCheck = []
    data.forEach((apiCoin) => {
      user.coins.forEach((userCoin) => {
        if(apiCoin.id === userCoin.name){
          coinCheck.push(apiCoin)
        }
      })
    })

    console.log('User coins', coinCheck)


    res.render('portfolio', {coinCheck})
   } catch (error) {
     
   } 
});




module.exports = router;