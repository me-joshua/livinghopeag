const { 
  handleCors, 
  sendSuccess, 
  sendError,
  sendUnauthorized,
  parseRequestBody,
  validateRequiredFields
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
      const announcements = await db.getAllAnnouncements();
      sendSuccess(res, announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      sendError(res, 'Failed to fetch announcements', 500);
    }
  } else if (req.method === 'POST') {
    try {
      const body = parseRequestBody(req);
      
      if (!body) {
        return sendError(res, 'Invalid JSON body', 400);
      }

      // Validate required fields
      const requiredFields = ['title', 'content'];
      const missingField = validateRequiredFields(body, requiredFields);
      
      if (missingField) {
        return sendError(res, missingField, 400);
      }

      // Create announcement
      const announcement = await db.createAnnouncement(body);
      
      if (!announcement) {
        return sendError(res, 'Failed to create announcement', 500);
      }

      sendSuccess(res, announcement, 201);
    } catch (error) {
      console.error('Error creating announcement:', error);
      sendError(res, 'Failed to create announcement', 500);
    }
  } else if (req.method === 'PUT') {
    try {
      const body = parseRequestBody(req);
      
      if (!body || !body.id) {
        return sendError(res, 'Invalid request: missing announcement ID', 400);
      }

      const announcement = await db.updateAnnouncement(body.id, body);
      
      if (!announcement) {
        return sendError(res, 'Failed to update announcement', 500);
      }

      sendSuccess(res, announcement);
    } catch (error) {
      console.error('Error updating announcement:', error);
      sendError(res, 'Failed to update announcement', 500);
    }
  } else if (req.method === 'DELETE') {
    try {
      const body = parseRequestBody(req);
      
      if (!body || !body.id) {
        return sendError(res, 'Invalid request: missing announcement ID', 400);
      }

      const success = await db.deleteAnnouncement(body.id);
      
      if (!success) {
        return sendError(res, 'Failed to delete announcement', 500);
      }

      sendSuccess(res, { message: 'Announcement deleted successfully' });
    } catch (error) {
      console.error('Error deleting announcement:', error);
      sendError(res, 'Failed to delete announcement', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
