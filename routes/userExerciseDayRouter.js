const Router = require('express')
const router = new Router()
const userExerciseDayController = require('../controllers/userExerciseDayController')

router.get('/:userProfileId', userExerciseDayController.getExerciseDays)
router.get('/day/:id', userExerciseDayController.getOneExerciseDay)
router.post('/', userExerciseDayController.create)
router.delete('/:id', userExerciseDayController.delete)
// router.patch('/', userDataController.update)

module.exports = router
