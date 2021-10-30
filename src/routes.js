const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const sessionController = require('./app/controllers/SessionController') 

routes.post('/sessions', (req, res) => {
    sessionController.store(req, res);
});

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
} )

module.exports = routes;
