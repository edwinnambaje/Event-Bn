import swaggerJSDoc from 'swagger-jsdoc';
import env from 'dotenv';

env.config();

const swaggerServer =
  process.env.SWAGGER_SERVER || 'http://localhost:4002/api/v1';

const options = {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'Event Management Api documentation',
      version: '1.0.0',
      description:
        'Event Management Api documentation for the events project. This documentation provides a detailed description of the endpoints',
    },
    servers: [{ url: swaggerServer }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/docs/*.js', './src/docs/*.yml'],
};

const swagger = swaggerJSDoc(options);

export default swagger;
