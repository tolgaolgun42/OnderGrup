const express = require('express');
const maintenanceController = require('../controllers/maintenanceController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const validate = require('../middlewares/validateInputs.js');
const { body, query } = require('express-validator');

const router = express.Router();

router.post('/addMaintenance', authMiddleware,
  validate([
    body('machineID').notEmpty().withMessage('Machine ID is required'),
    body('maintenanceDate').notEmpty().withMessage('Maintenance date is required'),
    body('maintenanceDetails').notEmpty().withMessage('Maintenance details are required')
  ]),
  maintenanceController.addMaintenance
);

router.get('/getMaintenance',authMiddleware,
  validate([
    query('machineID').notEmpty().withMessage('Machine ID is required')
  ]),
  maintenanceController.getMaintenance
);

router.delete('/deleteMaintenance',authMiddleware,
  validate([
    query('maintenanceID').notEmpty().withMessage('Maintenance ID is required')
  ]),
  maintenanceController.deleteMaintenance
);

module.exports = router;
