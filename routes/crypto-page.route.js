const router = require('express').Router();

router.get('/crypto-page', (req, res, next) => {
    res.render('crypto-page')
});

module.exports = router;

