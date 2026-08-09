const { body } = require('express-validator');

const petValidation = () => {
    return [
    body('petName')
        .trim()
        .notEmpty()
        .withMessage('Pet name is required'),

    body('species')
        .trim()
        .notEmpty()
        .withMessage('Species is required'),

    body('breed')
        .trim()
        .notEmpty()
        .withMessage('Breed is required'),

    body('age')
        .notEmpty()
        .withMessage('Age is required')
        .isInt({ min: 0 })
        .withMessage('Age must be a non-negative integer'),

    body('gender')
        .trim()
        .notEmpty()
        .withMessage('Gender is required'),

    body('weight')
        .notEmpty()
        .withMessage('Weight is required')
        .isFloat({ min: 0 })
        .withMessage('Weight must be a positive number'),

    body('ownerId')
        .trim()
        .notEmpty()
        .withMessage('Owner ID is required'),

    body('vaccinationStatus')
        .trim()
        .notEmpty()
        .withMessage('Vaccination status is required')
    ];
};

module.exports = petValidation;