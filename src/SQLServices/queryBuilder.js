import Logger from '../utils/logger';
import config from '../config.json';
import { isNullOrUndefined } from 'util';
const logger = new Logger();
const table=config.table;
const db = config.db;

export function buildQuery(inputs,queryConditions){
    logger.info(`building query for inputs ${JSON.stringify(inputs)} & conditions ${JSON.stringify(queryConditions)}`);
    inputs.email = inputs.email===''?'':inputs.email;

    let primaryCondition = null;
    logger.info(`${inputs.orgId}`)
    if(inputs.orgId === '' || isNullOrUndefined(inputs.orgId)){
        primaryCondition = `firstname like '%${inputs.firstname}%' AND lastname like '%${inputs.lastname}%'`;    
    }
    else{
        primaryCondition = `firstname like '%${inputs.firstname}%' AND lastname like '%${inputs.lastname}%' AND orgId='${inputs.orgId}'`;
    }
 

    return (
            `USE ${db};\
            SELECT * FROM ${table} where\
            (${primaryCondition})\
            AND\
            email like '%${inputs.email}%'\
            ${queryConditions.DOB}\
            dob='${inputs.DOB}'\
            ${queryConditions.phone}\
            phone=${inputs.phone}`
    );    
}