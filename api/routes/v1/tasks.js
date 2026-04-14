const express = require('express');
const router  = express.Router();

const service = require('../../services/v1/task');

router.get('/',     service.getAll);
router.post('/',    service.create);
router.patch('/:id', service.update);

module.exports = router;
