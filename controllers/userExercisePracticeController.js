const { UserExercisePractice } = require('../models/models')
const ApiError = require('../error/ApiError')

class userExercisePracticeController {
  async getExercisesPracticeDay(req, res) {
    const { userTraningPracticeId } = req.params
    const practiceExercises = await UserExercisePractice.findAll({
      where: { userTraningPracticeId: userTraningPracticeId },
    })
    return res.json(practiceExercises)
  }

  async getOneExercisePractice(req, res) {
    const { userTraningPracticeId, exerciseId } = req.params
    const practiceExercise = await UserExercisePractice.findOne({
      where: {
        userTraningPracticeId: userTraningPracticeId,
        exerciseId: exerciseId,
      },
    })
    return res.json(practiceExercise)
  }

  async createExercisePracticeDay(req, res, next) {
    try {
      const {
        name,
        dataArray,
        dataPractice,
        userTraningPracticeId,
        exerciseId,
      } = req.body

      const exercise = await UserExercisePractice.create({
        name,
        dataArray,
        dataPractice,
        userTraningPracticeId,
        exerciseId,
      })
      res.json(exercise)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async update(req, res, next) {
    try {
      const { userTraningPracticeId, exerciseId } = req.body
      const updateData = {}
      if (req.body.name) updateData.name = req.body.name
      if (req.body.dataArray) updateData.dataArray = req.body.dataArray
      if (req.body.dataPractice) updateData.dataPractice = req.body.dataPractice
      if (req.body.userTraningPracticeId)
        updateData.userTraningPracticeId = req.body.userTraningPracticeId
      if (req.body.exerciseId) updateData.exerciseId = req.body.exerciseId

      const result = await UserExercisePractice.update(updateData, {
        where: {
          userTraningPracticeId: userTraningPracticeId,
          exerciseId: exerciseId,
        },
      })

      return res.json(result)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new userExercisePracticeController()
