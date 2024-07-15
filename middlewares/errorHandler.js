function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
  }
  
  module.exports = errorHandler;
  