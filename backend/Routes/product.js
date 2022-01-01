const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { getUserById } = require("../Controllers/user");
const { createProduct, getProductById, getProduct, modifyProduct, deleteProduct } = require("../Controllers/product")
const { isSignedIn, isAuthenticated } = require("../Controllers/auth");
const { Router } = require('express');

router.param("userId", getUserById)
router.param("productId", getProductById)
router.post('/product/:userId', isSignedIn, isAuthenticated, [
   check('name').isLength({min:1 , max:50 }).withMessage('Enter valid productName'),
   check('description').isLength({min:1,max:2000}).withMessage('description is requried'),
   check('price').not().isEmpty().withMessage('enter the price')
],createProduct)
router.get('/product/:productId/', getProduct)
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, modifyProduct)
router.delete('/prouct/:productId/:userId', isSignedIn, isAuthenticated, deleteProduct)

module.exports = router;