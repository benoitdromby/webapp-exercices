const express = require('express');
const router  = express.Router();

const service = require('../../services/v1/orderbook');

router.get('/',        service.getOrderbook);
router.get('/updates', service.getUpdates);

module.exports = router;
