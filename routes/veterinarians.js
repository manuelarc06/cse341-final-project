const express = require('express');
const router = express.Router();

const veterinariansController = require('../controllers/veterinarians');

router.get('/', veterinariansController.getAll);

router.get('/:id', veterinariansController.getSingle);

router.post('/', veterinariansController.createVeterinarian);

router.put('/:id', veterinariansController.updateVeterinarian);

router.delete('/:id', veterinariansController.deleteVeterinarian);

module.exports = router;
