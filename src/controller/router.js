'use strict';
import MatchService from '../services/match';
import { isNullOrUndefined } from 'util';
import Logger from '../utils/logger';
const logger = new Logger();

exports.init=function(app,router){
    router.get('/v1/health',(request,response)=>{
      sendResponse(200,'ok',response);
    });

    router.post('/v1/match',(request,response)=>{
      const {
        firstname,
        lastname,
        DOB,
        email,
        phone,
        orgId
      } = request.body;
      if(isNullOrUndefined(firstname) || isNullOrUndefined(lastname)){
        sendResponse(400,'firstname, lastname is mandatory',response);
      }
      else{
        const _matcher = new MatchService();
        _matcher.findMatch(firstname,lastname,DOB,email,phone,orgId)
          .then(resultSet=>{
            sendResponse(200,resultSet,response);
          })
          .catch(error=>{
            sendResponse(400,error,response);
          });
      }
    });
    
  var sendResponse= function(status,message,response){
  response.status(status).send({
      data:message
    });
  };
};