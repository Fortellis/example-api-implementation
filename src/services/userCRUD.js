import { sqlConnection } from '../SQLServices/sqlConnector';
import * as QueryExecutor from '../SQLServices/queryExecutor';
const Request = require('tedious').Request;
import { isUndefined, isNull, isNullOrUndefined } from 'util';
import Logger from '../utils/logger';
import config from '../config.json'
const logger = new Logger();
const db = config.db;
const table = config.table;

export default class UserCRUDService {
    create(id, firstName, lastName, DOB = "", email = "", phone = "", orgId = "") {
        return new Promise((resolve, reject) => {
            if (isNullOrUndefined(id) || isNullOrUndefined(firstName) || isNullOrUndefined(lastName)) {
                reject('missing required parameters');
            } else {
                let query = `INSERT into dbo.Users ("Id","FirstName","LastName","DOB","Email","Phone","OrgId") VALUES ('${id}','${firstName}','${lastName}','${DOB}','${email}' ,'${phone}','${orgId}')`;
                console.log(query);
                const request = new Request(query, (error, count) => {
                    error ? logger.error(error) : logger.info('done executing the query');
                });
                request.on('error', (error) => {
                    logger.error('error running SQL query --> ', error);
                    reject(error);
                });
                request.on('requestCompleted', () => {
                    logger.info('SQL query execution complete');
                    resolve();
                });

                sqlConnection.execSql(request);
            }
        });

    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            let resultSet=[];
            let query = `select * from ${db}.${table}`;
            QueryExecutor.execute(query).then(resolve).catch(reject)
        });
    }
    getUserById(id=''){
        return new Promise((resolve, reject) => {
            let resultSet=[];
            let query = `select * from ${db}.${table} where Id='${id}'`;
            QueryExecutor.execute(query).then(resolve).catch(reject)
        });
    }

}