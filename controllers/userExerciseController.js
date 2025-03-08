const { UserExercise } = require('../models/models')
const ApiError = require('../error/ApiError')

class userExerciseController {
  async create(req, res) {
    const { current, practice, max, date, userProfileId, exerciseId } = req.body
    const userExercise = await UserExercise.create({
      current,
      practice,
      max,
      date,
      userProfileId,
      exerciseId,
    })
    res.json(userExercise)
  }

  async getAllExerciseWithProfile(req, res) {
    const { userProfileId } = req.params
    const allUserExercise = await UserExercise.findAll({
      where: { userProfileId },
    })
    return res.json(allUserExercise)
  }

  async getExerciseWithProfile(req, res) {
    const { userProfileId, exerciseId } = req.params
    const userExercise = await UserExercise.findOne({
      where: {
        userProfileId,
        exerciseId,
      },
    })
    return res.json(userExercise)
  }

  // меняем только среденее, макс, дату и число подходов
  async update(req, res, next) {
    try {
      const { id, current, practice, max, date } = req.body
      const updateExercise = await UserExercise.update(
        { current, practice, max, date },
        {
          where: { id },
        },
        { multi: true }
      )
      const exercise = await UserExercise.findByPk(id)

      return res.json(exercise)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body
      const result = await UserExercise.destroy({ where: { id: id } })
      return res.status(204).send()
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new userExerciseController()
