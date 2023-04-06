const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.route('/').get(userController.getAllUser)
                .post(userController.createUser)
                .patch(userController.updateUser)
                .delete(userController.deletUser)

module.exports = router

