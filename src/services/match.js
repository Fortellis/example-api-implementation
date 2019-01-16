import * as QueryBuilder from '../SQLServices/queryBuilder';
import { sqlConnection } from '../SQLServices/sqlConnector';
import * as QueryExecutor from '../SQLServices/queryExecutor';

const Request = require('tedious').Request;
import { isUndefined, isNull, isNullOrUndefined } from 'util';
import Logger from '../utils/logger';
const logger = new Logger();

export default class MatchService {
    /**
     * function to execute match and return results via promise
     * inputs - firstname, lastname, DOB (optional), email (optional), phone(optional), ordIg(optional)
     * output - list of matches
     * output contract - [{firstname, lastname, email, phone}]
     */
    findMatch(firstname, lastname, DOB = '', email = '', phone = '', orgId = '') {
        logger.info('finding match');
        //determine which query to execute
        return new Promise((resolve, reject) => {
            this.buildQueryConditions({ DOB, email, phone, orgId }
                , (error, queryConditions) => {
                    if (error) {
                        logger.error('error building query conditions', error);
                        reject(error);
                    }
                    const sliceEmail = email.indexOf("@")>0?email.slice(0, email.indexOf("@")):email;
                    const inputs = this.updateInputsWithEmptyValue({ firstname, lastname, DOB, email:sliceEmail, phone, orgId });
                    const query = QueryBuilder.buildQuery(inputs, queryConditions)
                    QueryExecutor.execute(query)
                        .then(res => {
                            resolve(res);
                        })
                        .catch(err=>{
                            reject(err);
                        })
                });

        })
    }

    updateInputsWithEmptyValue(_obj) {
        const EMPTYSTRING = '\'\'';
        logger.info('scanning and updating input values');
        const result =
        {
            firstname: _obj.firstname,
            lastname: _obj.lastname,
            DOB: _obj.DOB === '' || isNullOrUndefined(_obj.DOB) ? '' : _obj.DOB,
            email: _obj.email === '' || isNullOrUndefined(_obj.email) ? '' : _obj.email,
            phone: _obj.phone === '' || isNullOrUndefined(_obj.phone) ? EMPTYSTRING : _obj.phone,
            orgId: _obj.orgId
            // orgId: _obj.orgId === '' || isNullOrUndefined(_obj.orgId) ? EMPTYSTRING : _obj.orgId
        }
        return result;
    }

    /**
     * 
     * @param {*} _obj - {DOB,email,phone,orgId}
     * @param {*} cb - callback
     * output - same object with results
     * ----make this generic function by iterating _obj ----
     */
    buildQueryConditions(_obj, cb) {
        logger.info('building query conditions');
        try {
            let queryConditions = {
                DOB: _obj.DOB === '' || isNullOrUndefined(_obj.DOB) ? 'OR' : 'AND',
                email: _obj.email === '' || isNullOrUndefined(_obj.email) ? 'OR' : 'AND',
                phone: _obj.phone === '' || isNullOrUndefined(_obj.phone) ? 'OR' : 'AND',
                // orgId: _obj.orgId === '' || isNullOrUndefined(_obj.orgId) ? 'OR' : 'AND'
            };
            cb(null, queryConditions)

        } catch (error) {
            logger.error(error);
            cb(error);
        }
    }
    }
