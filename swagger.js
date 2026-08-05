const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Animal Hospital Api',
        description: 'Animal Hospital Api'
    },
    host: 'localhost:3003',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);