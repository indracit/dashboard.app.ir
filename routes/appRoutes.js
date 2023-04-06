const express = require('express')
const router = express.Router()


router.route('/dashboard')
        .get((req,res)=>{
    res.render('dashboard',{title:'App.ir | Dashboard',username:req.session.username})
})
    
router.route('/reports')
        .get((req,res)=>{
    res.render('reports',{title:'App.ir | Reports',username:req.session.username})
})

router.route('/monitoring')
        .get((req,res)=>{
    res.render('monitoring',{title:'App.ir | Monitoring',username:req.session.username})
})

router.route('/syncdata')
        .get((req,res)=>{
    res.render('syncdata',{title:'App.ir | SyncData',username:req.session.username})
})

router.route('/searchdetails')
        .get((req,res)=>{
    res.render('searchdetails',{title:'App.ir | SearchDetails',username:req.session.username})
})

module.exports = router