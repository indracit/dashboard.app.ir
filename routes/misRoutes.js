const express = require('express')
const router = express.Router()
const misController = require('../controllers/misController')


router.route('/').post(misController.getMisData)

module.exports = router