import Logger from '../utils/logger';
const logger = new Logger();
const Connection = require('tedious').Connection;  
import configs from '../config.json';

const config = {  
    userName:configs.userName,
    password: configs.password,
    server: configs.SQLServer,
    options: {database: configs.db}  
};  
const sqlConnection = new Connection(config);  
sqlConnection.on('connect', function(err) {  
    err?logger.error('error connecting to SQL server-->'+err):
        logger.info('connected to SQL server');
}); 

exports.sqlConnection = sqlConnection;