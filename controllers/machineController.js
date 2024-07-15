const db = require('../config/database.js');

async function addMaintenance(req, res) {
  const { machineID, maintenanceDate, maintenanceDetails } = req.body;

  if (!machineID || !maintenanceDate || !maintenanceDetails) {
    return res.status(400).send({ error: 'All fields are required: machineID, maintenanceDate, maintenanceDetails.' });
  }

  try {
    const query = 'INSERT INTO maintenance (machineID, maintenanceDate, maintenanceDetails) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [machineID, maintenanceDate, maintenanceDetails]);
    res.status(201).send({ message: 'Maintenance added successfully', maintenanceId: result.insertId });
  } catch (err) {
    console.error('Error adding maintenance:', err);
    res.status(500).send({ error: 'Failed to add maintenance. Please try again later.', details: err.message });
  }
}

async function getMaintenance(req, res) {
  const { machineID } = req.query;

  if (!machineID) {
    return res.status(400).send({ error: 'machineID is required' });
  }

  try {
    const query = 'SELECT * FROM maintenance WHERE machineID = ?';
    const [results] = await db.execute(query, [machineID]);
    res.status(200).send(results);
  } catch (err) {
    console.error('Error getting maintenance:', err);
    res.status(500).send({ error: 'Failed to get maintenance records. Please try again later.', details: err.message });
  }
}

async function deleteMaintenance(req, res) {
  const { maintenanceID } = req.query;

  if (!maintenanceID) {
    return res.status(400).json({ error: 'Missing maintenanceID parameter' });
  }

  try {
    const query = 'DELETE FROM maintenance WHERE maintenanceID = ?';
    await db.execute(query, [maintenanceID]);
    res.status(200).json({ message: 'Maintenance record deleted successfully' });
  } catch (err) {
    console.error('Error deleting maintenance record:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}

module.exports = { addMaintenance, getMaintenance, deleteMaintenance };
