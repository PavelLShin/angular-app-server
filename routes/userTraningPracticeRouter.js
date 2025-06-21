const Router = require('express')
const router = new Router()
const userTraningPracticeController = require('../controllers/userTraningPracticeController')

router.post('/', userTraningPracticeController.createTraningPracticeDay)
router.get('/:id', userTraningPracticeController.getTraningPracticeDay)
router.patch('/', userTraningPracticeController.update)

module.exports = router
