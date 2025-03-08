const Router = require('express')
const router = new Router()
const userDataController = require('../controllers/userDataController')
const authMiddlewere = require('../middleware/authMiddlewere')

router.get('/:id', authMiddlewere, userDataController.getUserData)
router.post('/', userDataController.create)
router.patch('/', userDataController.update)

module.exports = router
