require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddlware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
const cookieParser = require('cookie-parser')

app.use(errorHandler)
app.use(cookieParser())

// Эндпоинты
app.get('/', (req, res) => {
  res.status(200).json({ message: 'WORK!' })
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
