const { Router } = require('express')
const router = Router();
const { adminController, summaryController } = require('../controllers');
const { verifyAdminToken } = require('../middlewares/adminTokenHandler')

router.get('/', adminController.getAll)
router.get('/summary', verifyAdminToken, summaryController.summary);
router.get('/get-my-data', verifyAdminToken, adminController.getMyData)
router.post('/login', adminController.login);
router.post('/register', adminController.register);
router.put('/update', verifyAdminToken, adminController.update);

module.exports = router