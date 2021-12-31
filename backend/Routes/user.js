const express = require('express');
const router = express.Router();
const {isSignedin} = require('../Controllers/auth');
const {getUserById,getUser,deleteUser} = require('../Controllers/user');

router.param('userId',getUserById);
router.get('/user/:userId',isSignedin,getUser);
router.delete('/user/:userId',isSignedin,deleteUser);
module.exports = router;