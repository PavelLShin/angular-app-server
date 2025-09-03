const Router = require('express')
const router = new Router()
const userTraningPracticeController = require('../controllers/userTraningPracticeController')

router.post('/', userTraningPracticeController.createTraningPracticeDay)
router.get('/:id', userTraningPracticeController.getTraningPracticeDay)
router.get(
  '/calendar/:userProfileId',
  userTraningPracticeController.getTraningPracticeDays
)
router.patch('/', userTraningPracticeController.update)

module.exports = router
