
const axios = require('axios');
const async = require('hbs/lib/async');
//const { response } = require('../app');

const router = require("express").Router();

/* GET home page */
router.get("/", async(req, res, next) => {
  let data = await getCoins()
  
  res.render("index", {data});
});

//link to home page
router.get("/crypto-info/:id", async(req, res, next) => {
  const {id} = req.params
  let response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  let data = response.data;
  console.log(data)

  res.render("crypto-page", data);
  });

//Api link for coin gecko
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






module.exports = router;
