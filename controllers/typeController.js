const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
  async create(req, res) {
    const { name } = req.body
    const type = await Type.create({ name })
    res.json(type)
  }

  async getAll(req, res) {
    const types = await Type.findAll()
    return res.json(types)
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body
      const result = await Type.destroy({ where: { id: id } })
      return res.status(204).send()
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new TypeController()
