const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Evaluación 360 Grados',
            version: '1.0.0',
            description: 'API RESTful para sistema de evaluacion 360 grados de empleados remotos'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [path.join(__dirname, '../routes/*.js')]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerSpec));

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log('Documentacion Swagger disponible en /api-docs');
};

module.exports = swaggerDocs;