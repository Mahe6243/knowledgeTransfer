const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin, isAdminOrSelf } = require('../Controllers/auth');
const { getUserById, getUser, getType, deleteUser, modifyUser, modifyCartItems } = require('../Controllers/user');
const { getProductById } = require('../Controllers/product')

router.param('userId', getUserById);
router.param('productId', getProductById);
router.param('type', getType);

router.get('/user/:userId', isSignedIn, isAdminOrSelf, getUser);
router.put('/user/:userId', isSignedIn, isAuthenticated, modifyUser);
router.put('/user/:userId/:productId/:type', isSignedIn, isAuthenticated, modifyCartItems);
router.delete('/user/:userId', isSignedIn, isAuthenticated, deleteUser);

module.exports = router;