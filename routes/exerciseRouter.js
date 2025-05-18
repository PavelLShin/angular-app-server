const Router = require('express')
const router = new Router()
const exerciseController = require('../controllers/exerciseController')
const checkRole = require('../middleware/checkRoleMiddlewere')

router.post('/', exerciseController.create, checkRole('ADMIN'))
router.get('/:typeId', exerciseController.getExerciseByType)
router.get('/get-one/:id', exerciseController.getOne)
router.patch('/', exerciseController.update)
router.delete('/:id', exerciseController.delete, checkRole('ADMIN'))

module.exports = router
