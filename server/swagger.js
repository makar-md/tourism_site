import swaggerAutogen from 'swagger-autogen'
import swaggerUi from 'swagger-ui-express'

//========== Swagger ==========//
const doc = {
  info: {
    title: 'tourismSite',
    description: 'Description'
  },
  host: `localhost:${process.env.PORT || 4200}`
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];
swaggerAutogen()(outputFile, endpointsFiles, doc);
//========== Swagger ==========//