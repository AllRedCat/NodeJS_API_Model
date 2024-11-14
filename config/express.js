const express = require('express');
const useRoutes = require('../src/routes/user');
const bodyParser = require('body-parser');
const config = require('config');

module.exports = () => {
    const app = express();

    // DETERMINANDO VARIAVEL DA PORTA DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'))

    // MIDDLEWARES
    app.use(bodyParser.json());

    // USE ROUTES
    app.use('/api', useRoutes);

    return app;
};