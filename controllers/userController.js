const User = require('../models/user')
const bcrypt = require('bcrypt');

const getAllUser = async (req,res)=>{
    const allUsers = await User.find({}).select('username roles active').lean().exec();
    res.status(200).json({allUsers})
}

const createUser = async (req,res)=>{
    const {username,password,roles} = req.body
    
    // Confirm data
    if (!username || !password) {
        return res.status(400).render('signup',{title:'App.ir | sign up',message:'All fields are required !'})
    }
    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate) return  res.status(409).render('signup',{title:'App.ir | sign up',message:'Username already taken !'})

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hash }
        : { username, "password": hash, roles }

    const user = await User.create(userObject)
    if (user) { //created 
        return res.redirect('/')
    } else {
        res.status(400).render('signup',{title:'App.ir | sign up',message: 'invalid user data'})
    }
}

const updateUser = async (req,res)=>{
    const {username,active} = req.body
    const result = await User.updateOne({ username: username }, { active: active });
    res.json({result})
}

const deletUser = async (req,res)=>{
    const {username,password} = req.body
    const result = await User.findOneAndDelete({username:username})
    res.json({message:`user  ${result.username} deleted successfully`})
}

module.exports = {getAllUser,createUser,updateUser,deletUser}