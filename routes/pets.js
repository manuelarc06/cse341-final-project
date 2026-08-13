const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');

const petValidation = require('../middleware/petValidation');
const validate = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// #swagger.tags = ['Pets']
// #swagger.description = 'Returns all pets.'
router.get('/', petsController.getAll);

// #swagger.tags = ['Pets']
// #swagger.description = 'Returns a pet by ID.'
router.get('/:id', petsController.getSingle);

// #swagger.tags = ['Pets']
// #swagger.description = 'Creates a new pet. Requires GitHub authentication.'
router.post('/', isAuthenticated, petValidation(), validate, petsController.createPet);

// #swagger.summary = 'Update a pet'
// #swagger.description = 'Requires GitHub authentication.'
router.put('/:id', isAuthenticated, petValidation(), validate, petsController.updatePet);

// #swagger.summary = 'Delete a pet'
// #swagger.description = 'Requires GitHub authentication.'
router.delete('/:id', isAuthenticated, petsController.deletePet);

module.exports = router;