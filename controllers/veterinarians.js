const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Veterinarians']
    try {
        const result = await mongodb.getDatabase().db().collection('veterinarians').find();
        const veterinarians = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(veterinarians);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Veterinarians']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid veterinarian ID format"
            });
        }
        const veterinarianId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('veterinarians').find({ _id: veterinarianId });
        const veterinarians = await result.toArray();
        if (veterinarians.length === 0) {
            return res.status(404).json({ message: "Veterinarian not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(veterinarians[0]);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createVeterinarian = async (req, res) => {
    //#swagger.tags=['Veterinarians']
    try {
        const veterinarian = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            specialty: req.body.specialty,
            phone: req.body.phone,
            email: req.body.email
        };
        const response = await mongodb.getDatabase().db().collection('veterinarians').insertOne(veterinarian);
        if (response.acknowledged) {
            res.status(201).json({ message: "Veterinarian created successfully" });
        } else {
            res.status(500).json({
                message: "Error creating Veterinarian"
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateVeterinarian = async (req, res) => {
    //#swagger.tags=['Veterinarians']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid veterinarian ID format"
            });
        }
        const veterinarianId = new ObjectId(req.params.id);
        const veterinarian = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            specialty: req.body.specialty,
            phone: req.body.phone,
            email: req.body.email
        };
        const response = await mongodb.getDatabase().db().collection('veterinarians').replaceOne({ _id: veterinarianId }, veterinarian);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Veterinarian not found or no changes made" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteVeterinarian = async (req, res) => {
    //#swagger.tags=['Veterinarians']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid veterinarian ID format" });
        }
        const veterinarianId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('veterinarians').deleteOne({ _id: veterinarianId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Veterinarian deleted successfully" });
        } else {
            res.status(404).json({ message: "Veterinarian not found" });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createVeterinarian,
    updateVeterinarian,
    deleteVeterinarian
};
