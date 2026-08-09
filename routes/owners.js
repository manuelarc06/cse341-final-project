const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');

const validate = require('../middleware/validate');
const ownerValidation = require('../middleware/ownerValidation');

router.get('/', ownersController.getAll);

router.get('/:id', ownersController.getSingle);

router.post('/', ownerValidation(), validate, ownersController.createOwner);

router.put('/:id', ownerValidation(), validate,ownersController.updateOwner);

router.delete('/:id', ownersController.deleteOwner);

module.exports = router;