const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute.js');
const machineRoutes = require('./routes/machineRoute.js');
const maintenanceRoutes = require('./routes/maintenanceRoute.js');
const fileRoutes = require('./routes/fileRoute.js');
const authRoutes = require('./routes/authRoute.js');

dotenv.config();
const app = express();
const port = 3000;
const host = '0.0.0.0'; // Tüm IP adreslerinde dinlemek için

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/maintenances', maintenanceRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, host, () => {
  console.log(`Node app şu adreste dinleniyor: http://85.95.231.92:${port}`);
});
