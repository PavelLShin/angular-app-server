const uuid = require('uuid')
const path = require('path')
const { Exercise, ExerciseInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class ExerciseController {
  async create(req, res, next) {
    try {
      const { name, typeId, info } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const exercise = await Exercise.create({ name, typeId, img: fileName })

      if (info) {
        info = JSON.parse(info)
        info.forEach((i) => {
          ExerciseInfo.create({
            title: i.title,
            description: i.description,
            exerciseId: exercise.id,
          })
        })
      }

      return res.json(exercise)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res) {
    const { typeId } = req.query
    let exercises
    if (!typeId) {
      exercises = await Exercise.findAll()
    }
    if (typeId) {
      exercises = await Exercise.findAll({ where: { typeId } })
    }

    return res.json(exercises)
  }

  async getOne(req, res) {
    const { id } = req.params
    const exercise = await Exercise.findOne({
      where: { id },
      include: [{ model: ExerciseInfo, as: 'info' }],
    })
    return res.json(exercise)
  }

  async update(req, res, next) {
    try {
      const { id, typeId, name } = req.body
      const updateExercise = await Exercise.update(
        { typeId, name },
        {
          where: { id },
        },
        { multi: true }
      )
      const exercise = await Exercise.findByPk(id)

      return res.json(exercise)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body
      const result = await Exercise.destroy({ where: { id: id } })
      return res.status(204).send()
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new ExerciseController()
