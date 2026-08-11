const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');

const petValidation = require('../middleware/petValidation');
const validate = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', petsController.getAll);

router.get('/:id', petsController.getSingle);

router.post('/', isAuthenticated, petValidation(), validate, petsController.createPet);

router.put('/:id', isAuthenticated, petValidation(), validate, petsController.updatePet);

router.delete('/:id', isAuthenticated, petsController.deletePet);

module.exports = router;