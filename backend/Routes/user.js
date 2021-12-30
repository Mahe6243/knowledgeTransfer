const express = require('express');
const router = express.Router();
const u = require('../Controllers/user');

router.get('/user', u.user);

module.exports = router;