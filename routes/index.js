const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello World');});

router.use('/pets', require('./pets'));
router.use('/owners', require('./owners'));

module.exports = router;