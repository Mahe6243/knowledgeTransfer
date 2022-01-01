const User = require("../Models/User");


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