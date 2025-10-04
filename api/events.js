const { handleCors, sendSuccess, sendError } = require('./utils');
const { db } = require('./database');

module.exports = async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    try {
      const events = await db.getAllEvents();
      sendSuccess(res, events);
    } catch (error) {
      console.error('Error fetching events:', error);
      sendError(res, 'Failed to fetch events', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};