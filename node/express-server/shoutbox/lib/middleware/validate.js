function parseField(filed) {
    return filed.split('.');
}
function getField(req, filed) {
    let val = req.body;
    filed.forEach(prop => {
        val = val[prop];
    });
    return val;
}
exports.required = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        if (getField(req, field)) {
            next()
        } else {
            res.error(field.join(' ') + ' is required');
            res.redirect('black');
        }
    }
}
exports.lengthAbove = (field, len) => {
    field = parseField(field);
    return function(req, res, next) {
        if (getField(req, field).length > len) {
            next();
        } else {
            res.error(field + ' must have more than ' + len + ' characters');
            res.redirect('back');
        }
    }
}