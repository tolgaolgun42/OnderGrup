const mysql = require('mysql2');

const dbConfig = {
  host: process.env.DB_HOST, // Docker Compose'da belirtilen host
  user: process.env.DB_USER || 'root',     // Docker Compose'da belirtilen kullanıcı
  password: process.env.DB_PASS || 'ondergrup450', // Docker Compose'da belirtilen şifre
  database: process.env.DB_NAME || 'mydb', // Docker Compose'da belirtilen veritabanı adı
  port: process.env.DB_PORT || '3306',     // Docker Compose'da belirtilen port (3308)
};

const dbConnection = mysql.createConnection(dbConfig);

dbConnection.connect(err => {
  if (err) {
    console.error('MySQL veritabanına bağlantı başarısız:', err);
    throw err;
  }
  console.log('MySQL veritabanına başarıyla bağlanıldı.');
});

module.exports = dbConnection;
