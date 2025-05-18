const Router = require('express')
const router = new Router()
const userExerciseController = require('../controllers/userExerciseController')

router.post('/', userExerciseController.create)
router.get('/:userExerciseDayId', userExerciseController.getAllExerciseUserDay)
router.delete('/:userExerciseDayId', userExerciseController.deleteAll)

module.exports = router
