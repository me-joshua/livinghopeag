const { handleCors, sendSuccess, sendError } = require('./utils');
const { db } = require('./database');

module.exports = async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    try {
      const announcements = await db.getAllAnnouncements();
      sendSuccess(res, announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      sendError(res, 'Failed to fetch announcements', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};