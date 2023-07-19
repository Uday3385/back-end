const jwt = require('jsonwebtoken');
const constants = require('./constants');

/**
 * Create token
 * @param {Object} tokenPayload
 * @returns {Object}
 */
const createToken = async (tokenPayload) => {
    try {
        const token = await jwt.sign(tokenPayload, constants.JWT_TOKEN_SECRET, {
            expiresIn: constants.JWT_TOKEN_LIFETIME,
        });

        return { token: token };
    } catch (error) {
        return {  message: error.message,error: error };
    }
};

/**
 * Verify token
 * @param {String} token
 * @returns {Object}
 */
const verifyToken = async (token) => {
    try {
        const tokenPayload = await jwt.verify(token, constants.JWT_TOKEN_SECRET);
        return { tokenPayload: tokenPayload };
    } catch (error) {
        return {  message: error.message, error: error };
    }
};

module.exports = {
    createToken,
    verifyToken,
};
