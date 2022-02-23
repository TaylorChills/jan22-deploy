const router = require('express').Router();
const axios = require('axios');
const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
const Crypto = require('../models/crypto.model');
const User = require('../models/User.model');

//Api link
async function getCoins() {
    try{
    let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
    let data = await response.data
    return data
    }catch(err) {
      console.log(err)
    }
  }
  
//Route to see user portfolio
router.get('/portfolio', async(req, res, next) => {
   try {
    let data = await getCoins()
    let user = await User.findById(req.session.user._id).populate('coins')

    let coinCheck = []
    data.forEach((apiCoin) => {
      user.coins.forEach((userCoin) => {
        if(apiCoin.id === userCoin.name){
          coinCheck.push({...apiCoin, quantity: userCoin.quantity,})
        }
      })
    })
    
    res.render('portfolio', {coinCheck})
   } catch (error) {
     
   } 
});



router.get('/crypto-update/:id', (req, res, next) => {
  const coinId = req.params

  try{
    let user = await User.findById(req.session.user._id).populate('coins')




    res.render('crypto-update.hbs' {})
  } catch (error) {

  }
})



//Remove from portfolio
router.post('/portfolio/delete/:id', async(req, res, next) => {
  const coinId = req.params.id

  try {
    let user = await User.findById(req.session.user._id).populate('coins')
    let coinArr = user.coins.filter(element => element.name === coinId).map(element => element._id)
    
    let updatedUser = await User.findByIdAndUpdate(user._id, { $pull: { coins: coinArr[0] }} )
    let deleteCoin = await Crypto.findByIdAndRemove(  coinArr[0]  )

    res.redirect('/portfolio')
    } catch (error) {
  }
})







module.exports = router;










//Just in case I fuck up the code

/* router.get('/portfolio', async(req, res, next) => {
   
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
  //console.log("THIS IS THE USER!!!!!!!!!!!!",user.coins[0].quantity)
   res.render('portfolio', {coinCheck})
  } catch (error) {
    
  } 
}); */