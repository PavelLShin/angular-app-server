const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddlewere = require('../middleware/authMiddlewere')

router.get('/:id', userController.getOneUser)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/change-password', userController.getOneUserByEmail)
router.patch('/change-password', userController.resetUserPassword)
router.patch('/change-registration-data', userController.changeRegistrationData)

module.exports = router
