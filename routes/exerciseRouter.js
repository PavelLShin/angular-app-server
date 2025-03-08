const Router = require('express')
const router = new Router()
const exerciseController = require('../controllers/exerciseController')

router.post('/', exerciseController.create)
router.get('/', exerciseController.getAll)
router.get('/:id', exerciseController.getOne)
router.patch('/', exerciseController.update)
router.delete('/', exerciseController.delete)

module.exports = router
