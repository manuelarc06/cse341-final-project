const express = require('express');
const router = express.Router();

const veterinariansController = require('../controllers/veterinarians');

const validate = require('../middleware/validate');
const veterinarianValidation = require('../middleware/veterinarianValidator');

router.get('/', veterinariansController.getAll);

router.get('/:id', veterinariansController.getSingle);

router.post('/', veterinarianValidation(), validate, veterinariansController.createVeterinarian);

router.put('/:id', veterinarianValidation(), validate, veterinariansController.updateVeterinarian);

router.delete('/:id', veterinariansController.deleteVeterinarian);

module.exports = router;
