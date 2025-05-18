const { UserExerciseDay } = require('../models/models')
const ApiError = require('../error/ApiError')

class userExerciseDayController {
  async create(req, res, next) {
    try {
      const { tittle, userProfileId } = req.body
      const userExerciseDay = await UserExerciseDay.create({
        userProfileId,
        tittle,
      })
      res.json(userExerciseDay)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getExerciseDays(req, res, next) {
    try {
      const { userProfileId } = req.params
      const userExerciseDays = await UserExerciseDay.findAll({
        where: { userProfileId: userProfileId },
      })
      return res.json(userExerciseDays)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getOneExerciseDay(req, res, next) {
    try {
      const { id } = req.params
      const userExerciseDay = await UserExerciseDay.findOne({
        where: { id: id },
      })
      return res.json(userExerciseDay)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const result = await UserExerciseDay.destroy({
        where: { id: id },
      })
      return res.status(204).send()
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new userExerciseDayController()
