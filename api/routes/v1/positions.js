const express = require('express');
const router  = express.Router();

const service = require('../../services/v1/position');

router.get('/',    service.getAll);
router.post('/',   service.create);
router.patch('/:id',  service.update);
router.delete('/:id', service.delete);

module.exports = router;
