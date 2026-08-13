const express = require('express');
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate");

const ownersController = require('../controllers/owners');

const validate = require('../middleware/validate');
const ownerValidation = require('../middleware/ownerValidation');

// #swagger.tags = ['Owners']
// #swagger.description = 'Returns all owners.'
router.get('/', ownersController.getAll);

// #swagger.tags = ['Owners']
// #swagger.description = 'Returns an owner by ID.'
router.get('/:id', ownersController.getSingle);

// #swagger.tags = ['Owners']
// #swagger.description = 'Creates a new owner. Requires GitHub authentication.'
router.post('/', isAuthenticated, ownerValidation(), validate, ownersController.createOwner);

// #swagger.summary = 'Update an owner'
// #swagger.description = 'Requires GitHub authentication.'
router.put('/:id', isAuthenticated, ownerValidation(), validate, ownersController.updateOwner);

// #swagger.summary = 'Delete an owner'
// #swagger.description = 'Requires GitHub authentication.'
router.delete('/:id', isAuthenticated, ownersController.deleteOwner);

module.exports = router;