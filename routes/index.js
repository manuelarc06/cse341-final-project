const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Pets']
    res.send('Hello World');
});

router.use('/pets', require('./pets'));
router.use('/owners', require('./owners'));
router.use('/appointments', require('./appointments'));

module.exports = router;