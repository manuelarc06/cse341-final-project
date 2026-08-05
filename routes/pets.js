const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');

router.get('/', petsController.getAll);

router.get('/:id', petsController.getSingle);

router.post('/', petsController.createPet);

router.put('/:id', petsController.updatePet);

router.delete('/:id', petsController.deletePet);

module.exports = router;