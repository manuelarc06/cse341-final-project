const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Owners']
    const result = await mongodb.getDatabase().db().collection('owners').find();
    result.toArray().then((owners) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(owners);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Owners']
    const ownerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('owners').find({ _id: ownerId});
    result.toArray().then((owner) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(owner[0]);
    });
};

const createOwner = async (req, res) => {
    //#swagger.tags=['Owners']
    const owner = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    };
    const response = await mongodb.getDatabase().db().collection('owners').insertOne(owner);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the owner.');
    }
};

const updateOwner = async (req, res) => {
    //#swagger.tags=['Owners']
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
        res.status(500).json(response.error || 'Some error occurred while updating the owner.');
    }
};

const deleteOwner = async (req, res) => {
    //#swagger.tags=['Owners']
    const ownerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('owners').deleteOne({ _id: ownerId });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the owner.');
    }
};
    
module.exports = {
    getAll,
    getSingle,
    createOwner,
    updateOwner,
    deleteOwner
};