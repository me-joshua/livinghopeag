const { handleCors, sendHealthCheck } = require('./utils');

module.exports = async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    sendHealthCheck(res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};