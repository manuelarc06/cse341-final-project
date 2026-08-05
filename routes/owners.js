const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');

router.get('/', ownersController.getAll);

router.get('/:id', ownersController.getSingle);

router.post('/', ownersController.createOwner);

router.put('/:id', ownersController.updateOwner);

router.delete('/:id', ownersController.deleteOwner);

module.exports = router;