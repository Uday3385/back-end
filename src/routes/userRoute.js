const express = require('express');
const router = express.Router();

const {
    requireAuthorizedUser,
    hasValidUserIdParameter,
    isUserSuperAdmin,
    isUserHasAccessToOrganization,
} = require('../middleware/userMiddleware');
const constroller = require('../controllers/userController');

//  Middleware
router.use('/user', requireAuthorizedUser);
router.use('/user/organization', isUserSuperAdmin);

// User Route
router.route('/noauth/user/login').post(constroller.login);
router.route('/user/detail').get(constroller.getUserDetail);

// Organization Route
router.route('/user/organizations').get(constroller.getAllOrganization);
router.route('/user/organization').post(constroller.createOrganization);
router.route('/user/organization').patch(constroller.updateOrganization);
router.route('/user/organization').delete(constroller.deleteOrganization);

// Facility Route
router.route('/user/facilitys').get(constroller.getAllFacilityByOrganization);
router.route('/user/facility').post(constroller.createFacility);
router.route('/user/facility').patch(constroller.updateFacility);
router.route('/user/facility').delete(constroller.deleteFacility);

module.exports = router;
