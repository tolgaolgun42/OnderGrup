const express = require('express');
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const validate = require('../middlewares/validateInputs.js');
const { body } = require('express-validator');

const router = express.Router();

router.post('/registerUser',
  validate([
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').notEmpty().withMessage('Role is required')
  ]),
  userController.registerUser
);

router.get('/getUsers', authMiddleware, userController.getUsers);

module.exports = router;
