const router = require('express').Router();



const { default: axios } = require('axios');
//Crypto API
const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko();
//const Crypto = model('../models/crypto.model')

router.get('/home-page', (req, res, next) => {
    CoinGeckoClient
    .coins.all()
    res.render('home-page')
});

async function getCoins() {
    try{
        const response = await
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        const coin_updates = response.data.map(coin => coin.updateOne({id: coin.id}, coin, {upsert: true}));
        await Promise.all(coin_updates);
        } catch (error) {
            console.error(error);
        }
    }
    getCoins();





    



module.exports = router;