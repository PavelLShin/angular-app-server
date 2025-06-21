const Router = require('express')
const router = new Router()
const userExercisePracticeController = require('../controllers/userExercisePracticeController')

router.post('/', userExercisePracticeController.createExercisePracticeDay)
router.get(
  '/:userTraningPracticeId',
  userExercisePracticeController.getExercisesPracticeDay
)
router.get(
  '/:userTraningPracticeId/:exerciseId',
  userExercisePracticeController.getOneExercisePractice
)
router.patch('/', userExercisePracticeController.update)

module.exports = router
