// const {db} = require('../models/db')
const bcrypt = require('bcrypt');

const getAllUser = async (req,res)=>{
    res.json({message:'api under construction'})
}

const createUser = async (req,res)=>{
    const {username,password} = req.body
    // const userExist = await db('select username from appuser where username = :username',[username])
    if(userExist.rows.length !=0 && userExist.rows[0].USERNAME == username) return  res.json({message:'username already taken'})
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // const createuser = await db(`insert into appuser (username,password) values (:username,:password)`,[username,hash])
    if(createuser.rowsAffected == 1) return res.json({message:'User Created succesfully'})
    res.json({message:'user not created'})
}

const updateUser = async (req,res)=>{
    res.json({message:'api under construction'})
}

const deletUser = async (req,res)=>{
    res.json({message:'api under construction'})
}

module.exports = {getAllUser,createUser,updateUser,deletUser}