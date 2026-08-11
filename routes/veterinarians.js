const express = require('express');
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate");

const veterinariansController = require('../controllers/veterinarians');

const validate = require('../middleware/validate');
const veterinarianValidation = require('../middleware/veterinarianValidation');

router.get('/', veterinariansController.getAll);

router.get('/:id', veterinariansController.getSingle);

router.post('/', isAuthenticated, veterinarianValidation(), validate, veterinariansController.createVeterinarian);

router.put('/:id', isAuthenticated, veterinarianValidation(), validate, veterinariansController.updateVeterinarian);

router.delete('/:id', isAuthenticated, veterinariansController.deleteVeterinarian);

module.exports = router;
