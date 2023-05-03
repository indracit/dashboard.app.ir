const express = require('express')
const router = express.Router()

router.route('/')
        .get((req,res)=>{
        res.render('signup',{message:'',title:'App.ir | signup'})})

module.exports = router