jest.mock('../data/database');

const mongodb = require('../data/database');
const { getAll, getSingle } = require('../controllers/appointments');

describe('Appointments Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /appointments - should return all appointments', async () => {

        const appointments = [
            {
                _id: '6a77ed933a2832c1e37f57e4',
                petId: '6a721e611bcd3c3ad1c1ea85',
                veterinarianId: '6a77eb330a65d6a4eacd001a',
                appointmentDate: '2026-03-22T8:00:00',
                reason: 'Surgery consultation',
                status: 'Scheduled'
            },
            {
                _id: '6a77ed273a2832c1e37f57e1',
                petId: '6a721d8a1bcd3c3ad1c1ea83',
                veterinarianId: '6a77ebe00a65d6a4eacd001b',
                appointmentDate: '2026-08-15T10:00:00',
                reason: 'Annual checkup',
                status: 'Scheduled'
            }
        ];

        const toArray = jest.fn().mockResolvedValue(appointments);

        const find = jest.fn().mockReturnValue({
            toArray
        });

        const collection = jest.fn().mockReturnValue({
            find
        });

        const db = jest.fn().mockReturnValue({
            collection
        });

        mongodb.getDatabase.mockReturnValue({
            db
        });

        const req = {};

        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(appointments);
    });


    test('GET /appointments/:id - should return one appointment', async () => {

        const appointment = {
            _id: '6a77ed933a2832c1e37f57e4',
            petId: '6a721e611bcd3c3ad1c1ea85',
            veterinarianId: '6a77eb330a65d6a4eacd001a',
            appointmentDate: '2026-03-22T8:00:00',
            reason: 'Surgery consultation',
            status: 'Scheduled'
        };

        const toArray = jest.fn().mockResolvedValue([appointment]);

        const find = jest.fn().mockReturnValue({
            toArray
        });

        const collection = jest.fn().mockReturnValue({
            find
        });

        const db = jest.fn().mockReturnValue({
            collection
        });

        mongodb.getDatabase.mockReturnValue({
            db
        });

        const req = {
            params: {
                id: '6a77ed933a2832c1e37f57e4'
            }
        };

        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getSingle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(appointment);
    });

});