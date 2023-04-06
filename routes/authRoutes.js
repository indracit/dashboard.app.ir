const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const path = require('path')

router.route('/')
        .get((req,res)=>{
        res.render('index',{message:'',title:'App.ir | Login'})})

router.route('/login')
        .post(authController.login)

router.route('/logout')
        .get(authController.logout)

module.exports = router
