'use strict';
import MatchService from '../services/match';
import * as AdminServices from '../services/admin';
import UserCRUDService from '../services/userCRUD';
import { isNullOrUndefined } from 'util';
import * as TokenVerificationService from '../services/tokenVerification';

exports.init = function (app, router) {

  router.get('/', (request, response) => {
    sendResponse(200, 'ok', response);
  });
  router.get('/health', (request, response) => {
    sendResponse(200, 'ok', response);
  });

  router.post('/v1/match', (request, response) => {
    const {
      firstname,
      lastname,
      DOB,
      email,
      phone,
      orgId
    } = request.body;
    if (isNullOrUndefined(firstname) || isNullOrUndefined(lastname)) {
      sendResponse(400, 'firstname, lastname is mandatory', response);
    }
    else {
      const _matcher = new MatchService();
      _matcher.findMatch(firstname, lastname, DOB, email, phone, orgId)
        .then(resultSet => {
          sendResponse(200, resultSet, response);
        })
        .catch(error => {
          sendResponse(400, error, response);
        });
    }
  });
  router.post('/v1/users', (request, response) => {
    let crudservice = new UserCRUDService();
    const { id, firstName, lastName, DOB, email, phone, orgId } = request.body;
    crudservice.create(id, firstName, lastName, DOB, email, phone, orgId)
      .then(res => sendResponse(201, "created", response))
      .catch(error => sendResponse(400, error, response));
  });
  router.get('/v1/users', (request, response) => {
    let crudservice = new UserCRUDService();
    crudservice.getAllUsers()
      .then(res => sendResponse(200, res, response))
      .catch(error => sendResponse(400, error, response));
  });
  router.get('/v1/user/:id', (request, response) => {
    let crudservice = new UserCRUDService();
    crudservice.getUserById(request.params.id)
      .then(res => sendResponse(200, res, response))
      .catch(error => sendResponse(400, error, response));
  });
  router.post('/v1/activate', async (request, response) => {
    try {
      let _verify = await TokenVerificationService.verify(request);
      if (_verify === 401 || _verify === 403) {
        sendResponse(_verify || 401, "Token verification failure", response);
      } else {
        AdminServices.activate(request.body);
        sendResponse(200, "ok", response);
      }

    }
    catch (error) {
      sendResponse(error, "Token verification failure", response);
    }
  });

  router.post('/v1/deactivate/:connectionId', async (request, response) => {
    try {
      let _verify = await TokenVerificationService.verify(request);
      if (_verify === 401 || _verify === 403) {
        sendResponse(_verify || 401, "Token verification failure", response);
      } else {
        AdminServices.deactivate(request.params.connectionId);
        sendResponse(200, "ok", response);
      }

    }
    catch (error) {
      sendResponse(error, "Token verification failure", response);
    }
  });
  var sendResponse = function (status, message, response) {
    response.status(status).send({
      data: message
    });
  };
};