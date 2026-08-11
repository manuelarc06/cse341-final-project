const express = require('express');
const router = express.Router();

const appointmentsController = require('../controllers/appointments');

const appointmentValidation = require('../middleware/appointmentValidation');
const validate = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', appointmentsController.getAll);

router.get('/:id', appointmentsController.getSingle);

router.post('/', isAuthenticated, appointmentValidation(), validate, appointmentsController.createAppointment);

router.put('/:id', isAuthenticated, appointmentValidation(), validate, appointmentsController.updateAppointment);

router.delete('/:id', isAuthenticated, appointmentsController.deleteAppointment);

module.exports = router;