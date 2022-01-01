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
    req.body.postedUser = req.profile._id;
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
exports.getProduct = (req, res) => {
    Product.findById(req.product._id, (err, product) => {
        if (err) {
            return res.status(400).json({
                error: "product not found"
            })
        }
        return res.status(200).json(product);
    })

}

exports.modifyProduct = (req, res) => {
    Product.findByIdAndUpdate(req.product._id, req.body, { new: true }).exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Couldnot update"
            })
        }
        return res.status(200).json({
            message: "Product updated successfully",
            product: product
        })
    })

}

exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.product._id, (err, product) => {
        if (err) {
            return res.status(400).json({
                error: "product not found"
            })
        }
        return res.status(200).json(product);
    })
}