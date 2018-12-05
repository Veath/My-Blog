const User = require('../lib/user');
const Entry = require('../lib/entry');

exports.user = (req, res, next) => {
    User.get(req.params.id, (err, user) => {
        if(err) return next(err);
        if(!user.id) return res.end(404);
        res.json(user);
    })
};
exports.entries = (req, res, next) => {
    const page = req.page;
    Entry.getRange(page.from, page.to, (err, entries) => {
        if (err) return next(err);
        res.json(entries);
    });
}