const axios = require('axios')
const https = require('https')
const {baseUrl} = require('../appConfig.json')

const agent = new https.Agent({  
    rejectUnauthorized: false
});

const misClient = axios.create({
    baseURL : baseUrl,
    timeout : 10000000,
    httpsAgent: agent ,
    headers : {
        'Accept' : 'application/json'
    }
})

module.exports =  misClient 