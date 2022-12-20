const { Router } = require('express')
const router = Router();
const { landController } = require('../controllers');
const { verifyAdminToken } = require('../middlewares/adminTokenHandler')

router.get('/', verifyAdminToken, landController.getAll)
router.post('/', verifyAdminToken, landController.create)
router.put('/:id', verifyAdminToken, landController.update)

module.exports = router