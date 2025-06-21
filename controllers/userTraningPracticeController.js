const { UserTraningPractice } = require('../models/models')
const ApiError = require('../error/ApiError')

class userTraningPracticeController {
  async getTraningPracticeDay(req, res) {
    const { id } = req.params
    const practiceDay = await UserTraningPractice.findOne({
      where: { id: id },
    })
    return res.json(practiceDay)
  }

  async createTraningPracticeDay(req, res, next) {
    try {
      const { tittle, start, end, userExerciseDayId, userProfileId, duration } =
        req.body

      const practiceDay = await UserTraningPractice.create({
        tittle,
        start,
        end,
        userExerciseDayId,
        duration,
        userProfileId,
      })
      res.json(practiceDay)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.body
      const updateData = {}
      if (req.body.tittle) updateData.tittle = req.body.tittle
      if (req.body.start) updateData.start = req.body.start
      if (req.body.end) updateData.end = req.body.end
      if (req.body.userExerciseDayId)
        updateData.userExerciseDayId = req.body.userExerciseDayId
      if (req.body.duration) updateData.duration = req.body.duration
      if (req.body.userProfileId)
        updateData.userProfileId = req.body.userProfileId

      const result = await UserTraningPractice.update(updateData, {
        where: { id: id },
      })
      return res.json(result)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new userTraningPracticeController()
