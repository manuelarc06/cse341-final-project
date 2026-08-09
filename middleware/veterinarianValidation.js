const { body } = require('express-validator');

const veterinarianValidation = () => { 
    return [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),

    body('specialty')
        .trim()
        .notEmpty()
        .withMessage('Specialty is required'),

    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone is required'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid')
    ];
};
module.exports = veterinarianValidation;