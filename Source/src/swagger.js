const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API V1',
    description: 'Documentación de la API V1',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js', './V1/routes/mainRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./app.js'); 
});
