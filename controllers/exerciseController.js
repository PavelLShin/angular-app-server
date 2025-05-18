const uuid = require('uuid')
const path = require('path')
const { Exercise } = require('../models/models')
const ApiError = require('../error/ApiError')

class ExerciseController {
  async create(req, res, next) {
    try {
      const { name, typeId, info } = req.body
      const candidate = await Exercise.findOne({
        where: { name: req.body.name },
      })
      if (candidate) {
        return next(ApiError.badRequest('Данное упражнение уже существует'))
      } else {
        const { img } = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const exercise = await Exercise.create({
          name,
          typeId,
          img: fileName,
          info,
        })
        return res.json(exercise)
      }
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getExerciseByType(req, res, next) {
    try {
      const { typeId } = req.params
      const exercises = await Exercise.findAll({
        where: { typeId: typeId },
      })
      return res.json(exercises)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const result = await Exercise.destroy({ where: { id: id } })
      return res.status(204).send()
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.body
      const updateData = {}
      if (req.body.name) updateData.name = req.body.name
      if (req.body.typeId) updateData.typeId = req.body.typeId
      if (req.body.info) updateData.info = req.body.info

      if (req.files && req.files.img) {
        const { img } = req.files
        const fileName = uuid.v4() + '.jpg'
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        updateData.img = fileName
      }

      const candidate = await Exercise.findOne({
        where: { name: req.body.name },
      })
      if (candidate) {
        return next(ApiError.badRequest('Данное упражнение уже существует'))
      } else {
        const result = await Exercise.update(updateData, {
          where: { id: id },
        })
        return res.json(result)
      }
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getOne(req, res) {
    const { id } = req.params
    const exercise = await Exercise.findOne({
      where: { id },
    })
    return res.json(exercise)
  }
}

module.exports = new ExerciseController()
