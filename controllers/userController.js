const db = require('../config/database.js');
const bcrypt = require('bcrypt');

async function registerUser(req, res) {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).send({ error: 'All fields are required: username, password, role.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [username, hashedPassword, role]);
    res.status(201).send({ message: 'User registered successfully', userId: result.insertId });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ error: 'Failed to register user. Please try again later.', details: err.message });
  }
}

async function getUsers(req, res) {
  try {
    const query = 'SELECT id, username, role FROM users';
    const [results] = await db.execute(query);
    res.status(200).send(results);
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).send({ error: 'Failed to get users. Please try again later.', details: err.message });
  }
}

module.exports = { registerUser, getUsers };
