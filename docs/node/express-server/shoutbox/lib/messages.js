const express = require('express');
const res = express.response;

res.message = (msg, type) => {
    type = type || 'info';
    const sess = this.req.session;
    sess.messages = sess.messages || [];
    sess.messages.push({type: type, string: msg});
}
res.error = (msg) => res.message(msg, 'error');

module.exports = (req, res, next) => {
    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = () => req.session.messages = [];
    next();
}