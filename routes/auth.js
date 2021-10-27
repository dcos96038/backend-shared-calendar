/*
  Rutas de /auth
  host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/jwtValidator');

router.post(
  '/new',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    fieldValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
