const minioClient = require('../config/minio.js');
const { v4: uuidv4 } = require('uuid');

function uploadFile(req, res) {
  const { originalname, buffer } = req.file;

  const fileName = `${uuidv4()}-${originalname}`;
  const bucketName = 'test';
  const metaData = {
    'Content-Type': req.file.mimetype,
  };

  minioClient.putObject(bucketName, fileName, buffer, metaData, (err, etag) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send({ error: 'Failed to upload file. Please try again later.' });
    }
    res.status(201).send({ message: 'File uploaded successfully', fileName });
  });
}

function downloadFile(req, res) {
  const { fileName } = req.query;

  const bucketName = 'test';

  minioClient.getObject(bucketName, fileName, (err, dataStream) => {
    if (err) {
      console.error('Error downloading file:', err);
      return res.status(500).send({ error: 'Failed to download file. Please try again later.' });
    }
    dataStream.pipe(res);
  });
}

module.exports = {
  uploadFile,
  downloadFile,
};
