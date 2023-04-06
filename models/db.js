const oracledb = require('oracledb');
oracledb.autoCommit = true;

const config = require('../config/dbConfig')
const {logEvents} = require('../middleware/logger')

const db = async (query,data) => {
    let pool;
    try{
        pool = await  oracledb.createPool(config)
        let connection;

        try {

            connection = await pool.getConnection();
            result = await connection.execute(query,data, {outFormat: oracledb.OUT_FORMAT_OBJECT});
            return result;

        } catch(err){

            console.log(err.message);
            logEvents(`${err.name}: ${err.message}\t`, 'dbErrLog.log')

        } finally{

            if (connection) {

            try {

                await connection.close(); 

            } catch(err){

                console.log(err.message);
                logEvents(`${err.name}: ${err.message}\t`, 'dbErrLog.log')

            }}
        }
    } catch(err){

        console.log(err.message);
        logEvents(`${err.name}: ${err.message}\t`, 'dbErrLog.log')

    } finally {

    await pool.close();
    }
}

module.exports = {db}