const { Router } = require('express');
const router = Router();

router.use('/admin', require('./admin'));
router.use('/land', require('./land'));

module.exports = router;