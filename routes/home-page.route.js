const router = require('express').Router();

router.get('/home-page', (req, res, next) => {
    res.render('home-page')
});

module.exports = router;