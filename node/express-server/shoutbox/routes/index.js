const express = require('express');
const router = express.Router();

const page = require('../lib/middleware/page');
const Entry = require('../lib/entry');
const validate = require('../lib/middleware/validate');
const register = require('../control/register');
const entries = require('../control/entries');
const login = require('../control/login');
const api = require('./api');

router.get('/register', register.form);
router.post('/register', register.submit);
router.get('/login', login.form);
router.get('/logout', login.logout);
router.post('/login', login.submit);
router.get('/post', entries.form);
router.post('/post', 
  validate.required('title'),
  validate.lengthAbove('title', 4),
  entries.submit);
router.get('/:page?', page(Entry.count, 5), entries.list);

// RESTful
router.get('/api/user/:id', api.user);
router.get('/api/entries/:page?', page(Entry.count), api.entries);
router.post('/api/entry', 
  validate.required('title'),
  validate.lengthAbove('title', 4),
  entries.submit);

module.exports = router;