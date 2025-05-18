const { Type } = require('../models/models')
const { Exercise } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
  async create(req, res, next) {
    try {
      const { tittle } = req.body
      const candidate = await Type.findOne({
        where: { tittle: tittle },
      })
      if (candidate) {
        return next(ApiError.badRequest('Данный тип уже существует'))
      } else {
        const type = await Type.create({ tittle })
        res.json(type)
      }
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res) {
    const types = await Type.findAll()
    return res.json(types)
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id
      const exercises = await Exercise.findAll({
        where: { typeId: id },
      })
      if (exercises.length > 0) {
        const deletedCount = await Exercise.destroy({
          where: {
            typeId: id,
          },
        })
      }
      const result = await Type.destroy({ where: { id: id } })
      return res.status(204).send()
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new TypeController()
