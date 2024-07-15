const dbConnection = require('../config/database.js');

function addMaintenance(req, res) {
  const { maintenanceID, maintenanceDate, description, machineID } = req.body;

  if (!maintenanceID || !maintenanceDate || !description || !machineID) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

  const query = 'INSERT INTO maintenances (maintenanceID, maintenanceDate, description, machineID) VALUES (?, ?, ?, ?)';
  dbConnection.query(query, [maintenanceID, maintenanceDate, description, machineID], (err, result) => {
    if (err) {
      console.error('Error adding maintenance:', err);
      return res.status(500).send({ error: 'Failed to add maintenance. Please try again later.' });
    }
    res.status(201).send({ message: 'Maintenance added successfully', maintenanceId: result.insertId });
  });
}

function getMaintenances(req, res) {
  const query = 'SELECT * FROM maintenances';
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error getting maintenances:', err);
      return res.status(500).send({ error: 'Failed to get maintenances. Please try again later.' });
    }
    res.status(200).send(results);
  });
}

function getMaintenanceDetails(req, res) {
  const { maintenanceID } = req.query;

  if (!maintenanceID) {
    return res.status(400).json({ error: 'Missing maintenanceID parameter' });
  }

  const query = 'SELECT * FROM maintenances WHERE maintenanceID = ?';
  dbConnection.query(query, [maintenanceID], (err, results) => {
    if (err) {
      console.error('Error getting maintenance details:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Maintenance not found' });
    }

    const maintenanceData = results[0];
    const sortedMaintenanceData = {};
    const keys = Object.keys(maintenanceData).sort();

    keys.forEach(key => {
      sortedMaintenanceData[key] = maintenanceData[key];
    });

    res.status(200).json(sortedMaintenanceData);
  });
}

function deleteMaintenance(req, res) {
  const { maintenanceID } = req.query;

  if (!maintenanceID) {
    return res.status(400).json({ error: 'Missing maintenanceID parameter' });
  }

  const query = 'DELETE FROM maintenances WHERE maintenanceID = ?';
  dbConnection.query(query, [maintenanceID], (err, results) => {
    if (err) {
      console.error('Error deleting maintenance:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Maintenance not found' });
    }

    res.status(200).json({ message: 'Maintenance deleted successfully' });
  });
}

module.exports = {
  addMaintenance,
  getMaintenances,
  getMaintenanceDetails,
  deleteMaintenance,
};
