const User = require("../Models/User");

exports.getType = (req, res, next, type) => {
    req.type = type;
    next();
}

exports.getUserById = (req, res, next, id) => {
    User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: err
            })
        }
        user.encryptedPassword = undefined;
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    return res.status(200).json(req.profile);
}

exports.modifyUser = (req, res) => {
    User.findByIdAndUpdate(req.profile._id, req.body, { new: true }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Couldnot update"
            })
        }
        return res.status(200).json({
            message: "User updated successfully",
            user: user
        })
    })
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.profile._id, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "couldnot delete user"
            })
        }
        return res.status(200).json(user);
    })
}

exports.modifyCartItems = (req, res) => {
    User.findById(req.profile._id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Cant find"
            })
        }
        let cartItems = user.cartItems;
        if (req.type == '0') {
            cartItems.push(req.product._id);
        }
        else {
            cartItems = cartItems.filter(item => !item.equals(req.product._id));
        }
        User.findByIdAndUpdate(req.profile._id, { cartItems }).exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                message: "Updated",
                cartItems: user.cartItems
            })
        })
    })

}