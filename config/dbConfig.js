const {decrypt} = require('../utils/crypto')
const {dbConfig} = require('../appConfig.json')

const { userName,connectString , password } = dbConfig

module.exports = {
            user          : userName,
            password      : decrypt(password),  
            connectString : connectString
        }