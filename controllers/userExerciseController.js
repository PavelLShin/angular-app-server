const { UserExercise } = require('../models/models')
const ApiError = require('../error/ApiError')

class userExerciseController {
  async create(req, res, next) {
    try {
      const { name, userExerciseDayId, exerciseId } = req.body
      const userExercise = await UserExercise.create({
        name,
        userExerciseDayId,
        exerciseId,
      })
      res.json(userExercise)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAllExerciseUserDay(req, res) {
    const { userExerciseDayId } = req.params
    const exercises = await UserExercise.findAll({
      where: { userExerciseDayId: userExerciseDayId },
    })
    return res.json(exercises)
  }

  async deleteAll(req, res) {
    try {
      const { exerciseId, userExerciseDayId } = req.params
      const result = await UserExercise.destroy({
        where: { userExerciseDayId: userExerciseDayId },
      })
      return res.status(204).send()
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new userExerciseController()
