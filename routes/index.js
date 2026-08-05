const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Pets']
    res.send('Hello World');
});

router.use('/pets', require('./pets'));

module.exports = router;