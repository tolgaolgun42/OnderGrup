const dbConnection = require('../config/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

  const query = 'SELECT * FROM Users WHERE username = ?';
  dbConnection.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).send({ error: 'Failed to login. Please try again later.' });
    }

    if (results.length === 0) {
      return res.status(401).send({ error: 'Invalid username or password.' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ uid: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).send({ token });
  });
}

module.exports = {
  login,
};
