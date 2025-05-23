const sequelize = require('../db')
const { DataTypes, DATE } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const UserProfile = sequelize.define('user_profile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const UserData = sequelize.define('user_data', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  nickname: { type: DataTypes.STRING },
  age: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  weight: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  height: { type: DataTypes.STRING },
})

const UserExerciseDay = sequelize.define('user_exercise_day', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tittle: { type: DataTypes.STRING, unique: false, allowNull: false },
})

const UserExercise = sequelize.define('user_exercise', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: false, allowNull: false },
})

const Exercise = sequelize.define('exercise', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  info: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tittle: { type: DataTypes.STRING, unique: true, allowNull: false },
})

// const ExerciseInfo = sequelize.define('exercise_info', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING, allowNull: false },
//   description: { type: DataTypes.STRING, allowNull: false },
// })

User.hasOne(UserProfile)
UserProfile.belongsTo(User)

User.hasOne(UserData)
UserData.belongsTo(User)

UserProfile.hasMany(UserExerciseDay)
UserExerciseDay.belongsTo(UserProfile)

UserExerciseDay.hasMany(UserExercise)
UserExercise.belongsTo(UserExerciseDay)

Exercise.hasMany(UserExercise)
UserExercise.belongsTo(Exercise)

// Exercise.hasMany(UserExercise)
// UserExercise.belongsTo(Exercise)

Type.hasMany(Exercise)
Exercise.belongsTo(Type)

module.exports = {
  User,
  UserProfile,
  UserExerciseDay,
  UserExercise,
  Exercise,
  Type,
  UserData,
}
