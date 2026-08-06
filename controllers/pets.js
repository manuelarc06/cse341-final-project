const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Pets']
    try {
        const result = await mongodb.getDatabase().db().collection('pets').find();
        const pets = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Pets']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid pet ID format"});
        }
        const petId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('pets').find({_id: petId});
        const pets = await result.toArray();
        if (pets.length === 0) {
            return res.status(404).json({message: "Pet not found"});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets[0]);

    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createPet = async (req, res) => {
    //#swagger.tags=['Pets']
    try {
        const pet = {
            petName: req.body.petName,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            ownerId: req.body.ownerId,
            vaccinationStatus: req.body.vaccinationStatus
        };
        const response = await mongodb.getDatabase().db().collection('pets').insertOne(pet);
        if (response.acknowledged) {
            res.status(201).json({message: "Pet created successfully"});
        }
        else {
            res.status(500).json({message: "Error creating pet"});
        }

    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const updatePet = async (req, res) => {
    //#swagger.tags=['Pets']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid pet ID format"});
        }
        const petId = new ObjectId(req.params.id);
        const pet = {
            petName: req.body.petName,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            ownerId: req.body.ownerId,
            vaccinationStatus: req.body.vaccinationStatus
        };
        const response = await mongodb.getDatabase().db().collection('pets').replaceOne({ _id: petId }, pet);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json({message: "Pet not found or no changes made"});
        }

    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const deletePet = async (req, res) => {
    //#swagger.tags=['Pets']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid pet ID format"});
        }
        const petId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('pets').deleteOne({_id: petId});
        if (response.deletedCount > 0) {
            res.status(200).json({message: "Pet deleted successfully"});
        }
        else {
            res.status(404).json({message: "Pet not found"});
        }

    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAll,
    getSingle,
    createPet,
    updatePet,
    deletePet
};