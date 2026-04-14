var express = require('express');
var router = express.Router();

const userRoute      = require('./user');
const positionsRoute  = require('./positions');
const orderbookRoute  = require('./orderbook');
const tasksRoute      = require('./tasks');

const positionService = require('../../services/v1/position');
const metricsService  = require('../../services/v1/metrics');

router.get('/', async (req, res) => {
    res.status(200).json({
        name   : 'API',
        version: '1.0',
        status : 200,
        message: 'Bienvenue sur l\'API !'
    });
});

router.use('/users',     userRoute);
router.use('/positions', positionsRoute);
router.use('/orderbook', orderbookRoute);
router.use('/tasks',     tasksRoute);
router.get('/prices',    positionService.getPrices);
router.get('/metrics',   metricsService.stream);

module.exports = router;