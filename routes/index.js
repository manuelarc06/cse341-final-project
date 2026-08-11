const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));

router.use('/pets', require('./pets'));
router.use('/owners', require('./owners'));
router.use('/appointments', require('./appointments'));
router.use('/veterinarians', require('./veterinarians'));

// #swagger.tags = ['Authentication']
// #swagger.description = 'Redirects the user to GitHub OAuth authentication.'
router.get('/login', passport.authenticate('github'), (req, res) => { });

// #swagger.tags = ['Authentication']
// #swagger.description = 'Ends the authenticated session.'
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;