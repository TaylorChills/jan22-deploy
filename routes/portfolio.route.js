const router = require('express').Router();


/* const Portfolio = require('../models/portfolio.model'); */


router.get('/portfolio', (req, res, next) => {
    res.render('portfolio')
});

module.exports = router;