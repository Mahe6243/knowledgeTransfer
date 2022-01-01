const Product = require("../Models/Product")
const { validationResult } = require('express-validator');

exports.getProductById = (req, res, next, id) => {
    Product.findById(id, (err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: err
            })
        }
        req.product = product;
        next();
    })
}
exports.createProduct = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors
        })
    }
    let product = new Product(req.body)
    product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json(product)
    })
}
exports.getProduct = (req,res) =>{

}

exports.modifyProduct = (req, res) => {

}

exports.deleteProduct = (req, res) => {

}