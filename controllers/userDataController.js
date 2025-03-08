const uuid = require('uuid')
const path = require('path')
const { UserData } = require('../models/models')
const ApiError = require('../error/ApiError')

class userDataController {
  async getUserData(req, res, next) {
    try {
      const { id } = req.params
      const user = await UserData.findOne({
        where: { userId: id },
      })
      return res.json(user)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async create(req, res, next) {
    try {
      const { name, nickname, age, surname, weight, gender, height, userId } =
        req.body
      const { img } = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const candidate = await UserData.findOne({
        where: { nickname: req.body.nickname },
      })
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким никнеймом существует')
        )
      } else {
        const userData = await UserData.create({
          name,
          nickname,
          age,
          surname,
          weight,
          gender,
          height,
          userId,
          img: fileName,
        })
        return res.json(userData)
      }
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async update(req, res, next) {
    try {
      const { userId } = req.body
      const updateData = {}
      if (req.body.name) updateData.name = req.body.name
      if (req.body.nickname) updateData.nickname = req.body.nickname
      if (req.body.age) updateData.age = req.body.age
      if (req.body.surname) updateData.surname = req.body.surname
      if (req.body.weight) updateData.weight = req.body.weight
      if (req.body.gender) updateData.gender = req.body.gender
      if (req.body.height) updateData.height = req.body.height

      if (req.files && req.files.img) {
        const { img } = req.files
        const fileName = uuid.v4() + '.jpg'
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        updateData.img = fileName
      }

      const candidate = await UserData.findOne({
        where: { nickname: req.body.nickname },
      })
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким никнеймом существует')
        )
      } else {
        const result = await UserData.update(updateData, {
          where: { userId },
        })

        return res.json(result)
      }
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new userDataController()
