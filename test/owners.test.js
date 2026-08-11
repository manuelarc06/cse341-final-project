jest.mock('../data/database');

const mongodb = require('../data/database');
const { getAll, getSingle } = require('../controllers/owners');

describe('Owners Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /owners - should return all owners', async () => {

        const owners = [
            {
                _id: '6a721bba85c7d11623a6c483',
                firstName: 'Maria',
                lastName: 'Garcia',
                phone: '555-987-6543',
                email: 'sofiag@test.com',
                address: '123 Street No. 3-12, Bogota, Col'
            },
            {
                _id: '6a721cee85c7d11623a6c484',
                firstName: 'Carlos',
                lastName: 'Martinez',
                phone: '555-234-4367',
                email: 'carlos@test.com',
                address: '234 Street No. 12-13, Bogota, Col'
            }
        ];

        const toArray = jest.fn().mockResolvedValue(owners);

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
        expect(res.json).toHaveBeenCalledWith(owners);
    });


    test('GET /owners/:id - should return one owner', async () => {

        const owner = {
            _id: '6a721cee85c7d11623a6c484',
            firstName: 'Carlos',
            lastName: 'Martinez',
            phone: '555-234-4367',
            email: 'carlos@test.com',
            address: '234 Street No. 12-13, Bogota, Col'
        };

        const toArray = jest.fn().mockResolvedValue([owner]);

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
                id: '6a721cee85c7d11623a6c484'
            }
        };

        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getSingle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(owner);
    });

});