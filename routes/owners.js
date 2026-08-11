const express = require('express');
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate");

const ownersController = require('../controllers/owners');

const validate = require('../middleware/validate');
const ownerValidation = require('../middleware/ownerValidation');

router.get('/', ownersController.getAll);

router.get('/:id', ownersController.getSingle);

router.post('/', isAuthenticated, ownerValidation(), validate, ownersController.createOwner);

router.put('/:id', isAuthenticated, ownerValidation(), validate, ownersController.updateOwner);

router.delete('/:id', isAuthenticated, ownersController.deleteOwner);

module.exports = router;