const constants = require('../utils/constants');

exports.successResponse = (res, data) => {
    return this.sendResponse(res, constants.HTTP_SUCCESS_CODE, data);
};

exports.createdResponse = (res, data) => {
    return this.sendResponse(res, constants.HTTP_CREATED_CODE, data);
};

exports.badRequestResponse = (res, data) => {
    return this.sendResponse(res, constants.HTTP_BAD_REQUEST_CODE, data);
};

exports.unauthorizeResponse = (res, data) => {
    return this.sendResponse(res, constants.HTTP_UNAUTHORIZE_CODE, data);
};

exports.forbiddenResponse = (res, data) => {
    return this.sendResponse(res, constants.HTTP_FORBIDDEN_CODE, data);
};

exports.notFoundResponse = (res, data) => {
    return this.sendResponse(res, constants.HTTP_NOT_FOUND_CODE, data);
};

exports.conflictResponse = (res, data) => {
    return this.sendResponse(res, constants.HTTP_CONFLICT_CODE, data);
};

exports.failureResponse = (res, data) => {
    return this.sendResponse(res, constants.HTTP_FAILURE_CODE, data);
};

exports.sendResponse = (res, statusCode, responseData) => {
    // const stackTraceList = new Error().stack.split('\n');
    // stackTraceList.splice(0, 2);
    // responseData.stackTrace = stackTraceList;
    return res.status(statusCode).json(responseData);
};
