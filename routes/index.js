const Router = require('express')
const router = new Router()
const exerciseRouter = require('./exerciseRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const userExerciseRouter = require('./userExerciseRouter')
const userDataRouter = require('./userDataRouter')
const userExerciseDayRouter = require('./userExerciseDayRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/exercise', exerciseRouter)
router.use('/userExercise', userExerciseRouter)
router.use('/userData', userDataRouter)
router.use('/userExerciseDay', userExerciseDayRouter)

module.exports = router
