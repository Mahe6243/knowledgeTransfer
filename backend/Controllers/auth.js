const { validationResult } = require('express-validator');
const User = require('../Models/User');

exports.signup = (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors
        });
    }
    let user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json(user);
    })
}

exports.signin = (req, res) => {

}

exports.signout = (req, res) => {

}