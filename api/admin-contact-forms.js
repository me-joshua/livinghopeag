const { 
  handleCors, 
  sendSuccess, 
  sendError,
  sendUnauthorized
} = require('../utils');
const { db } = require('../database');
const { verifyToken } = require('../auth');

module.exports = async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  // Verify authentication for all admin endpoints
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendUnauthorized(res, 'Missing or invalid authorization token');
  }

  const token = authHeader.substring(7);
  const user = await verifyToken(token);
  
  if (!user) {
    return sendUnauthorized(res, 'Invalid or expired token');
  }

  if (req.method === 'GET') {
    try {
      const contactForms = await db.getAllContactForms();
      sendSuccess(res, contactForms);
    } catch (error) {
      console.error('Error fetching contact forms:', error);
      sendError(res, 'Failed to fetch contact forms', 500);
    }
  } else if (req.method === 'DELETE') {
    // TODO: Implement delete functionality
    sendError(res, 'Delete not yet implemented', 501);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
