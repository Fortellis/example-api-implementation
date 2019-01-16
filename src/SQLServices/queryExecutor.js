import { sqlConnection } from '../SQLServices/sqlConnector';
const Request = require('tedious').Request;
import Logger from '../utils/logger';
const logger = new Logger();

/**
 * just execute given query
 */
export function execute(query) {
    logger.info(`executing query --> ${JSON.stringify(query)}`);
    let resultSet = [];
    return new Promise((resolve, reject) => {
        const request = new Request(query, () => {
            logger.info('done executing the query');
        });
        request.on('row', (columns) => {
            logger.info('received a row');
            let results = {};

            columns.forEach((column) => {
                switch (column.metadata.colName.toLowerCase()) {
                    case 'id':
                        results.id = column.value;
                        break;
                    case 'dob':
                        results.dob = column.value;
                        break;
                    case 'firstname':
                        results.firstname = column.value
                        break;
                    case 'lastname':
                        results.lastname = column.value
                        break;
                    case 'email':
                        results.email = column.value;
                        break;
                    case 'phone':
                        results.phone = column.value;
                        break;
                    case 'orgid':
                        results.orgid = column.value;
                        break;
                    default:
                        break;
                }
            });
            resultSet.push(results);
        });

        request.on('error', (error) => {
            logger.error('error running SQL query --> ', error);
            reject(error);
        });
        request.on('requestCompleted', () => {
            logger.info('SQL query execution complete');
            logger.info(JSON.stringify(resultSet));
            resolve(resultSet);
        });

        sqlConnection.execSql(request);

    });
}