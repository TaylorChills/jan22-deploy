const router = require('express').Router();

router.get('/stocks-page', (req, res, next) => {
    res.render('stocks-page')
});

module.exports = router;
