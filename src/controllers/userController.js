const bcrypt = require('bcrypt');
const pool = require('../database');

const { successResponse, badRequestResponse, notFoundResponse, failureResponse } = require('../utils/responseUtils');
const { createToken } = require('../utils/tokenUtils');
const constants = require('../utils/constants');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email && password) {
            const userRes = await pool.query('select * from at_user."getUserDetailForLogin"($1)', [email]);

            if (userRes.rowCount === 1) {
                const userData = userRes.rows[0];
                const match = await bcrypt.compare(password, userData.password);

                if (match) {
                    delete userData.password;
                    const tokenRes = await createToken(userData, constants.JWT_TOKEN_LIFETIME);

                    if (!tokenRes.error) {
                        return successResponse(res, { ...tokenRes, ...userData });
                    } else {
                        return failureResponse(res, tokenRes);
                    }
                } else {
                    return badRequestResponse(res, { message: 'Incorrect password' });
                }
            } else {
                return notFoundResponse(res, { message: 'User not found' });
            }
        } else {
            return badRequestResponse(res, { message: 'Invalid email or password' });
        }
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const getUserDetail = async (req, res) => {
    try {
        pool.query('select * from at_user."getUserDetailById"($1)', [res.locals.user.userId])
            .then((result) => {
                return successResponse(res, result.rows[0]);
            })
            .catch((error) => {
                return failureResponse(res, { message: error.message, error: error });
            });
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const getAllOrganization = async (req, res) => {
    try {
        pool.query('select * from at_user."getAllOrganization"()')
            .then((result) => {
                if (result.rows.length > 0) {
                    return successResponse(res, result.rows);
                } else {
                    return notFoundResponse(res, { message: 'No record found' });
                }
            })
            .catch((error) => {
                return failureResponse(res, { message: 'Error while get all organization', error: error });
            });
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const createOrganization = async (req, res) => {
    const name = req.body.name;
    try {
        if (name) {
            pool.query('select * from at_user."insertOrganization"($1,$2)', [name, res.locals.user.userId])
                .then((result) => {
                    return successResponse(res, { organizationId: result.rows[0].insertOrganization });
                })
                .catch((error) => {
                    return failureResponse(res, { message: 'Error while creating organization', error: error });
                });
        } else {
            return badRequestResponse(res, { message: 'Invalid name' });
        }
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const updateOrganization = async (req, res) => {
    const { organizationId, name } = req.body;
    try {
        if (organizationId && name) {
            pool.query('select * from at_user."updateOrganization"($1,$2,$3)', [
                organizationId,
                name,
                res.locals.user.userId,
            ])
                .then((result) => {
                    return successResponse(res, { message: result.rows[0].updateOrganization });
                })
                .catch((error) => {
                    return failureResponse(res, { message: 'Error while updating organization', error: error });
                });
        } else {
            return badRequestResponse(res, { message: 'Invalid organizationId or name' });
        }
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const deleteOrganization = async (req, res) => {
    const { organizationId } = req.body;
    try {
        if (organizationId) {
            pool.query('select * from at_user."deleteOrganization"($1,$2)', [organizationId, res.locals.user.userId])
                .then((result) => {
                    return successResponse(res, { message: result.rows[0].deleteOrganization });
                })
                .catch((error) => {
                    return failureResponse(res, { message: 'Error while deleting organization', error: error });
                });
        } else {
            return badRequestResponse(res, { message: 'Invalid organizationId' });
        }
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const getAllFacilityByOrganization = async (req, res) => {
    const organizationId = req.body.organizationId;
    try {
        if (organizationId) {
            pool.query('select * from at_user."getAllFacilityByOrganization"($1)', [organizationId])
                .then((result) => {
                    if (result.rows.length > 0) {
                        return successResponse(res, result.rows);
                    } else {
                        return notFoundResponse(res, { message: 'No record found' });
                    }
                })
                .catch((error) => {
                    return failureResponse(res, { message: 'Error while get all organization', error: error });
                });
        } else {
            return badRequestResponse(res, { message: 'Invalid organizationId' });
        }
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const createFacility = async (req, res) => {
    const { organizationId, name } = req.body;
    try {
        if (organizationId && name) {
            pool.query('select * from at_user."insertFacility"($1,$2,$3)', [
                organizationId,
                name,
                res.locals.user.userId,
            ])
                .then((result) => {
                    return successResponse(res, { facilityId: result.rows[0].insertFacility });
                })
                .catch((error) => {
                    return failureResponse(res, { message: 'Error while creating facility', error: error });
                });
        } else {
            return badRequestResponse(res, { message: 'Invalid organizationId or name' });
        }
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const updateFacility = async (req, res) => {
    const { facilityId, name } = req.body;
    try {
        if (facilityId && name) {
            pool.query('select * from at_user."updateFacility"($1,$2,$3)', [facilityId, name, res.locals.user.userId])
                .then((result) => {
                    return successResponse(res, { message: result.rows[0].updateFacility });
                })
                .catch((error) => {
                    return failureResponse(res, { message: 'Error while updating facility', error: error });
                });
        } else {
            return badRequestResponse(res, { message: 'Invalid facilityId or name' });
        }
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

const deleteFacility = async (req, res) => {
    const { facilityId } = req.body;
    try {
        if (facilityId) {
            pool.query('select * from at_user."deleteFacility"($1,$2)', [facilityId, res.locals.user.userId])
                .then((result) => {
                    return successResponse(res, { message: result.rows[0].deleteFacility });
                })
                .catch((error) => {
                    return failureResponse(res, { message: 'Error while deleting organization', error: error });
                });
        } else {
            return badRequestResponse(res, { message: 'Invalid facilityId' });
        }
    } catch (error) {
        return failureResponse(res, { message: error.message, error: error });
    }
};

module.exports = {
    login,
    getUserDetail,

    getAllOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization,

    createFacility,
    getAllFacilityByOrganization,
    updateFacility,
    deleteFacility
};
