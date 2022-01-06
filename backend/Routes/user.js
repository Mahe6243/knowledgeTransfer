const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { isSignedIn, isAuthenticated, isAdminOrSelf } = require('../Controllers/auth');
const { getUserById, getUser, deleteUser, modifyUser } = require('../Controllers/user');

router.param('userId', getUserById);

router.get('/user/:userId', isSignedIn, isAdminOrSelf, getUser);
router.put('/user/:userId', [
    check('firstName').isLength({ min: 1, max: 40 }).withMessage('First Name should be > 0 and <= 40 characters'),
    check('lastName').isLength({ min: 1, max: 40 }).withMessage('Last Name should be > 0 and <= 40 characters'),
    check('phoneNumber').isLength({ min: 10, max: 10 }).withMessage('Enter a valid phone number')
], isSignedIn, isAuthenticated, modifyUser);
router.delete('/user/:userId', isSignedIn, isAuthenticated, deleteUser);

module.exports = router;