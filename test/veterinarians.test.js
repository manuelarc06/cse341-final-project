jest.mock('../data/database');

const mongodb = require('../data/database');
const { getAll, getSingle } = require('../controllers/veterinarians');

describe('Veterinarians Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /veterinarians - should return all veterinarians', async () => {

        const veterinarians = [
            {
                _id: '6a77eb330a65d6a4eacd001a',
                firstName: 'Sofia',
                lastName: 'Sosa',
                specialty: 'Surgery',
                phone: '333-556-8989',
                email: 'laura@test.com'
            },
            {
                _id: '6a77ebe00a65d6a4eacd001b',
                firstName: 'Jhon',
                lastName: 'Sanabria',
                specialty: 'General Practice',
                phone: '111-445-6767',
                email: 'jhon@test.com'
            }
        ];

        const toArray = jest.fn().mockResolvedValue(veterinarians);

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
        expect(res.json).toHaveBeenCalledWith(veterinarians);
    });


    test('GET /veterinarians/:id - should return one veterinarian', async () => {

        const veterinarian = {
            _id: '6a77eb330a65d6a4eacd001a',
            firstName: 'Sofia',
            lastName: 'Sosa',
            specialty: 'Surgery',
            phone: '333-556-8989',
            email: 'laura@test.com'
        };

        const toArray = jest.fn().mockResolvedValue([veterinarian]);

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
                id: '6a77eb330a65d6a4eacd001a'
            }
        };

        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getSingle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(veterinarian);
    });

});