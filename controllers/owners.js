const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Owners']
    try {
        const result = await mongodb.getDatabase().db().collection('owners').find();
        const owners = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(owners);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Owners']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid owner ID format"
            });
        }
        const ownerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('owners').find({ _id: ownerId });
        const owners = await result.toArray();
        if (owners.length === 0) {
            return res.status(404).json({ message: "Owner not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(owners[0]);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createOwner = async (req, res) => {
    //#swagger.tags=['Owners']
    try {
        const owner = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        };
        const response = await mongodb.getDatabase().db().collection('owners').insertOne(owner);
        if (response.acknowledged) {
            res.status(201).json({ message: "Owner created successfully" });
        } else {
            res.status(500).json({
                message: "Error creating owner"
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOwner = async (req, res) => {
    //#swagger.tags=['Owners']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid owner ID format"
            });
        }
        const ownerId = new ObjectId(req.params.id);
        const owner = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        };
        const response = await mongodb.getDatabase().db().collection('owners').replaceOne({ _id: ownerId }, owner);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Owner not found or no changes made" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteOwner = async (req, res) => {
    //#swagger.tags=['Owners']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid owner ID format" });
        }
        const ownerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('owners').deleteOne({ _id: ownerId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Owner deleted successfully" });
        } else {
            res.status(404).json({ message: "Owner not found" });
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
    createOwner,
    updateOwner,
    deleteOwner
};