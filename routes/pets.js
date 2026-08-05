const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');

router.get('/', petsController.getAll);

router.get('/:id', petsController.getSingle);

module.exports = router;