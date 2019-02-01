const express = require('express');
const router = express.Router();


const controller = require('../controllers/favorite.controller');
router.get('/', controller.get);
router.post('/', controller.create);
router.delete('/:guid', controller.delete);
module.exports = router;