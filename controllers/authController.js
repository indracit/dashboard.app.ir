const bcrypt = require('bcrypt')
const User = require('../models/user')


const login = async (req,res)=>{

    const {username,password} = req.body;
    if (!username || !password) {
        return res.status(400).render('index',{title:'App.ir',message:'All fields are required !'})
    }

    const foundUser = await User.findOne({ username }).exec()
    if(!foundUser || !foundUser.active)return res.render('index',{title:'App.ir',message:'Un authorized'})
    const match = await bcrypt.compare(password, foundUser.password);

    if(!match) return res.render('index',{title:'App.ir',message:'invalid password !!!'})
    req.session.isAuth = true
    req.session.username = username
    return res.redirect('/dashboard')
}


const logout = async (req,res)=>{
    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
    return res.redirect('/')}

module.exports={ login , logout }

