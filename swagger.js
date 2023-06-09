const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'Worklog Jira',
        version:'1.1.17042023',
        description: 'API para registrar Worklog no Jira '
    },
    basePath:'/',
};

const options = {
    swaggerDefinition,
    apis: ['./index.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;