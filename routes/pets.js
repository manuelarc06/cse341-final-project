const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');

const petValidation = require('../middleware/petValidation');
const validate = require('../middleware/validate');

router.get('/', petsController.getAll);

router.get('/:id', petsController.getSingle);

router.post('/', petValidation(), validate, petsController.createPet);

router.put('/:id', petValidation(), validate, petsController.updatePet);

router.delete('/:id', petsController.deletePet);

module.exports = router;