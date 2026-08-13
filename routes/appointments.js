const express = require('express');
const router = express.Router();

const appointmentsController = require('../controllers/appointments');

const appointmentValidation = require('../middleware/appointmentValidation');
const validate = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// #swagger.tags = ['Appointments']
// #swagger.description = 'Returns all appointments.'
router.get('/', appointmentsController.getAll);

// #swagger.tags = ['Appointments']
// #swagger.description = 'Returns an appointment by ID.'
router.get('/:id', appointmentsController.getSingle);

// #swagger.tags = ['Appointments']
// #swagger.description = 'Creates a new appointmennt. Requires GitHub authentication.'
router.post('/', isAuthenticated, appointmentValidation(), validate, appointmentsController.createAppointment);

// #swagger.summary = 'Update an appointment'
// #swagger.description = 'Requires GitHub authentication.'
router.put('/:id', isAuthenticated, appointmentValidation(), validate, appointmentsController.updateAppointment);

// #swagger.summary = 'Delete an appointment'
// #swagger.description = 'Requires GitHub authentication.'
router.delete('/:id', isAuthenticated, appointmentsController.deleteAppointment);

module.exports = router;