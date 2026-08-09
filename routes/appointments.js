const express = require('express');
const router = express.Router();

const appointmentsController = require('../controllers/appointments');

const appointmentValidation = require('../middleware/appointmentValidation');
const validate = require('../middleware/validate');

router.get('/', appointmentsController.getAll);

router.get('/:id', appointmentsController.getSingle);

router.post('/', appointmentValidation(), validate, appointmentsController.createAppointment);

router.put('/:id', appointmentValidation(), validate, appointmentsController.updateAppointment);

router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;