const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User, UserProfile } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    const userProfile = await UserProfile.create({ userId: user.id })
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token, id: user.id })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан не верный пароль'))
    }

    const token = generateJwt(user.id, user.email, user.role)

    return res.json({ token, id: user.id })
  }

  async getOneUser(req, res) {
    const id = req.params.id
    const user = await User.findOne({
      where: { id },
    })
    return res.json(user)
  }

  async getOneUserByEmail(req, res, next) {
    const { email } = req.body
    const user = await User.findOne({
      where: { email },
    })
    if (user) {
      return res.json(user.id)
    } else {
      return next(
        ApiError.badRequest('Пользователя с таким email не существует')
      )
    }
  }

  async resetUserPassword(req, res) {
    const { password, id } = req.body
    const hashPassword = await bcrypt.hash(password, 5)
    const userUpdate = await User.update(
      { password: hashPassword },
      {
        where: { id },
      }
    )
    return res.json(userUpdate)
  }

  async changeRegistrationData(req, res, next) {
    const { email, currentPassword, password, role, id } = req.body
    const updateData = {}
    if (email) {
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким email существует')
        )
      }
      updateData.email = email
    }

    if (currentPassword) {
      const userData = await User.findOne({ where: { id } })
      let comparePassword = bcrypt.compareSync(
        currentPassword,
        userData.password
      )
      if (!comparePassword) {
        return next(ApiError.internal('Указан не верный пароль'))
      }
    }

    if (password) {
      const hashPassword = await bcrypt.hash(password, 5)
      updateData.password = hashPassword
    }

    if (role) {
      updateData.role = role
    }
    const user = await User.update(updateData, {
      where: { id },
    })
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token, id: user.id })
  }
}

module.exports = new UserController()
