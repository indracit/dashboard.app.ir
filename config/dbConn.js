const {decrypt} = require('../utils/crypto')
const mongoose = require('mongoose')
const {mongoURI} = require('../appConfig.json')

const connectDB = async () =>{
    try{
        await mongoose.connect(decrypt(mongoURI))
    } catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB 