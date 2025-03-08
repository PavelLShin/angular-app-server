const Router = require('express')
const router = new Router()
const userExerciseController = require('../controllers/userExerciseController')

router.post('/', userExerciseController.create)
router.get('/:userProfileId', userExerciseController.getAllExerciseWithProfile)
router.get(
  '/:userProfileId/:exerciseId',
  userExerciseController.getExerciseWithProfile
)

router.patch('/', userExerciseController.update)
router.delete('/', userExerciseController.delete)

module.exports = router
