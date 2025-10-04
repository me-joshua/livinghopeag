const { handleCors, sendSuccess, sendError } = require('./utils');
const { db } = require('./database');

module.exports = async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    try {
      const media = await db.getAllMedia();
      sendSuccess(res, media);
    } catch (error) {
      console.error('Error fetching media:', error);
      sendError(res, 'Failed to fetch media', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};