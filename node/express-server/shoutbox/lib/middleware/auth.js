const basicAuth = require('express-basic-auth');
const User = require('../user');
exports.auth = (req, res, next) => {
    basicAuth({
        authorizeAsync: true,
        authorizer: (username, password, cb) => {
            User.authenticate(username, password, (err, user) => {
                if (err) return cb(err)
                if (user) {
                    req.authUser = user;
                }
                cb(null, user);
            })
        },
    })(req, res, next);
}