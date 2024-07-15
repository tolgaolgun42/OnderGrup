const express = require('express');
const machineController = require('../controllers/machineController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const validate = require('../middlewares/validateInputs.js');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/addMachine',
  authMiddleware,
  validate([
    body('machineName').notEmpty().withMessage('Machine name is required'),
    body('machineID').notEmpty().withMessage('Machine ID is required'),
    body('machineType').notEmpty().withMessage('Machine type is required'),
    body('ownerUser').notEmpty().withMessage('Owner user is required')
  ]),
  machineController.addMachine
);

router.get('/getMachines', authMiddleware, machineController.getMachines);
router.get('/getMachineDetails', authMiddleware, machineController.getMachineDetails);
router.delete('/deleteMachine', authMiddleware, machineController.deleteMachine);

module.exports = router;
