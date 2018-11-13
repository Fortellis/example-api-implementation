import Logger from '../utils/logger';
import { isNullOrUndefined } from 'util';
const logger = new Logger();
const table='dbo.Users';
const db ='test';
export function buildQuery(inputs,queryConditions){
    logger.info(inputs);
    logger.info(`building query for inputs ${JSON.stringify(inputs)} & conditions ${JSON.stringify(queryConditions)}`);
    inputs.email = inputs.email===''?'':inputs.email;
    logger.info(inputs.email);
    return (
            `USE ${db};\
            SELECT * FROM ${table} where\
            (firstname like '%${inputs.firstname}%' AND lastname like '%${inputs.lastname}%')\
            AND\
            email like '%${inputs.email}%'\
            ${queryConditions.DOB}\
            dob='${inputs.DOB}'\
            ${queryConditions.phone}\
            phone=${inputs.phone}\
            ${queryConditions.orgId}\
            orgId=${inputs.orgId}`
    );    
}