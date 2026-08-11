jest.mock('../data/database');

const mongodb = require('../data/database');
const { getAll, getSingle } = require('../controllers/pets');

describe('Pets Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /pets - should return all pets', async () => {

        const pets = [
            {
                _id: '6a721d8a1bcd3c3ad1c1ea83',
                petName: 'Queeny',
                species: 'Cat',
                breed: 'Siamese',
                age: 2,
                gender: 'Female',
                weight: 5,
                ownerId: '6a721bba85c7d11623a6c483',
                vaccinationStatus: 'Pending'
            },
            {
                _id: '6a721e611bcd3c3ad1c1ea85',
                petName: 'Max',
                species: 'Dog',
                breed: 'Golden Retriever',
                age: 4,
                gender: 'Male',
                weight: 30,
                ownerId: '6a721cee85c7d11623a6c484',
                vaccinationStatus: 'Up to date'
            }
        ];

        const toArray = jest.fn().mockResolvedValue(pets);

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
        expect(res.json).toHaveBeenCalledWith(pets);
    });


    test('GET /pets/:id - should return one pet', async () => {

        const pet = {
            _id: '6a721e611bcd3c3ad1c1ea85',
            petName: 'Max',
            species: 'Dog',
            breed: 'Golden Retriever',
            age: 4,
            gender: 'Male',
            weight: 30,
            ownerId: '6a721cee85c7d11623a6c484',
            vaccinationStatus: 'Up to date'
        };

        const toArray = jest.fn().mockResolvedValue([pet]);

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
                id: '6a721e611bcd3c3ad1c1ea85'
            }
        };

        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getSingle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(pet);
    });

});