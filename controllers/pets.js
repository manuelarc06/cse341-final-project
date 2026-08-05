const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('pets').find();
    result.toArray().then((pets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets);
    });
};

const getSingle = async (req, res) => {
    const petId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('pets').find({ _id: petId});
    result.toArray().then((pets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets[0]);
    });
};

module.exports = {
    getAll,
    getSingle
};