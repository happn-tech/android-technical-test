const express = require('express')
const router = express.Router()


const controller = require('../controllers/favorite.controller')
router.get('/', controller.get)
router.post('/', controller.create)
router.delete('/', controller.deleteMultiple)
router.delete('/:id', controller.delete)
module.exports = router