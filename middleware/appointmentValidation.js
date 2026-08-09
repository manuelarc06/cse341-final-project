const { body } = require('express-validator');

const appointmentValidation = () => {
    return [
    body('petId')
        .trim()
        .notEmpty()
        .withMessage('Pet ID is required')
        .isMongoId()
        .withMessage('Pet ID must be a valid MongoDB ID'),

    body('veterinarianId')
        .trim()
        .notEmpty()
        .withMessage('Veterinarian ID is required')
        .isMongoId()
        .withMessage('Veterinarian ID must be a valid MongoDB ID'),

    body('appointmentDate')
        .notEmpty()
        .withMessage('Appointment date is required')
        .isISO8601()
        .withMessage('Appointment date must be a valid date'),

    body('reason')
        .trim()
        .notEmpty()
        .withMessage('Reason is required'),

    body('status')
        .trim()
        .notEmpty()
        .withMessage('Status is required')
    ];
};

module.exports = appointmentValidation;