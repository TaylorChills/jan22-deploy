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
          coinCheck.push({...apiCoin, userCoinId: userCoin._id, quantity: userCoin.quantity,})
        }
      })
    })
    
    function displayMoney(arr) {
      let total = 0
        for(let i = 0; i < arr.length; i++){
        total += arr[i].current_price * arr[i].quantity
      } return Math.round(total * 100) /100
      
    }
      let userMoney = displayMoney(coinCheck)
      //coinCheck.push({...data, ,})

      console.log('testing', coinCheck)

    res.render('portfolio', {coinCheck, userTotal: userMoney})
   } 
   catch (error) {
     
   } 
});



router.get('/crypto-update/:id', async(req, res, next) => {
  const {id} = req.params
  const coin = await Crypto.findById(id)
  res.render('crypto-update.hbs/', {coin})
 
})

router.post('/crypto-update/:id', async(req, res, next) => {

  const {id} = req.params

  const number = req.body.quantity

  await Crypto.findByIdAndUpdate(id, {quantity: number})

  res.redirect('/portfolio')

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