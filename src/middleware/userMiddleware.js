const { badRequestResponse, unauthorizeResponse, forbiddenResponse } = require('../utils/responseUtils');
const { verifyToken } = require('../utils/tokenUtils');

/**
 * Middleware function to validate provided user token.
 *
 * @param {{}} req
 * @param {{}} res
 * @param {String} req.headers.authorization user token
 * @param {Function} next
 * @returns {Promise<*>}
 */
const requireAuthorizedUser = async (req, res, next) => {
    let token = req.headers?.authorization;

    if (token) {
        const payload = await verifyToken(token);
        if (!payload.error) {
            res.locals.user = payload.tokenPayload;
            return next();
        } else {
            return unauthorizeResponse(res, payload);
        }
    } else {
        return unauthorizeResponse(res, { message: 'No user token presented' });
    }
};

/**
 * Middleware to validate a URL userId parameter is present.
 * @param {{}} req
 * @param {{}} res
 * @param {String} req.params.userId
 * @param {Function} next
 * @returns {Response}
 */
const hasValidUserIdParameter = (req, res, next) => {
    const userId = req.params.userId;

    if (userId) {
        return next();
    } else {
        return badRequestResponse(res, { message: 'No userId passed' });
    }
};

/**
 * Middleware function to validate user is super admin or not.
 *
 * @param {{}} req
 * @param {{}} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const isUserSuperAdmin = async (req, res, next) => {
    if (res.locals.user.role === 'superAdmin') {
        return next();
    } else {
        return forbiddenResponse(res, { message: 'You do not have access.' });
    }
};

/**
 * Middleware function to validate user has access to organization.
 *
 * @param {{}} req
 * @param {{}} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const isUserHasAccessToOrganization = async (req, res, next) => {
    const userRole = res.locals.user.role;
    if (userRole === 'superAdmin') {
        return next();
    } else if (!userRole) {
        return next();
    } else {
        return forbiddenResponse(res, { message: 'You do not have access.' });
    }
};

module.exports = { requireAuthorizedUser, hasValidUserIdParameter, isUserSuperAdmin, isUserHasAccessToOrganization };
