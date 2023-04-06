const misClient = require('../config/axios')
const {logEvents} = require('../middleware/logger')


const getMisData = async(req,res) => {

    await misClient.post('/api_data.php', {...req.body},
    { 'headers': {'Content-Type': 'multipart/form-data'}})
                    .then(resp => res.json(resp.data))
                    .catch(err => {
                        logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
                    })

}

module.exports = {getMisData}