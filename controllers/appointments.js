const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Appointments']
    try {
        const result = await mongodb.getDatabase().db().collection('appointments').find();
        const appointments = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(appointments);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Appointments']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid appointment ID format"});
        }
        const appointmentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('appointments').find({ _id: appointmentId});
        const appointments = await result.toArray();
        if (appointments.length === 0) {
            return res.status(404).json({ message: "Appointment not found"});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(appointments[0]);

    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createAppointment = async (req, res) => {
    //#swagger.tags=['Appointments']
    try {
        const appointment = {
            petId: req.body.petId,
            veterinarianId: req.body.veterinarianId,
            appointmentDate: req.body.appointmentDate,
            reason: req.body.reason,
            status: req.body.status
        };
        const response = await mongodb.getDatabase().db().collection('appointments').insertOne(appointment);
        if (response.acknowledged) {
            res.status(201).json({ message: "Appointment created successfully"});
        }
        else {
            res.status(500).json({ message: "Error creating appointment"});
        }

    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const updateAppointment = async (req, res) => {
    //#swagger.tags=['Appointments']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid appointment ID format"});
        }
        const appointmentId = new ObjectId(req.params.id);
        const appointment = {
            petId: req.body.petId,
            veterinarianId: req.body.veterinarianId,
            appointmentDate: req.body.appointmentDate,
            reason: req.body.reason,
            status: req.body.status
        };
        const response = await mongodb.getDatabase().db().collection('appointments').replaceOne({ _id: appointmentId }, appointment);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Appointment not found or no changes made"});
        }

    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const deleteAppointment = async (req, res) => {
    //#swagger.tags=['Appointments']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid appointment ID format"});
        }
        const appointmentId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('appointments').deleteOne({ _id: appointmentId});
        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Appointment deleted successfully"});
        }
        else {
            res.status(404).json({ message: "Appointment not found"});
        }

    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAll,
    getSingle,
    createAppointment,
    updateAppointment,
    deleteAppointment
};
