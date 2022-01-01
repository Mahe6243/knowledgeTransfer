const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const { getUserById, getUser, deleteUser, modifyUser } = require('../Controllers/user');

router.param('userId', getUserById);
router.get('/user/:userId', isSignedIn, isAdmin, getUser);
router.put('/user/:userId', isSignedIn, isAuthenticated, modifyUser);
router.delete('/user/:userId', isSignedIn, isAuthenticated, deleteUser);
module.exports = router;