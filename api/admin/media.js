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
      const media = await db.getAllMedia();
      sendSuccess(res, media);
    } catch (error) {
      console.error('Error fetching media:', error);
      sendError(res, 'Failed to fetch media', 500);
    }
  } else if (req.method === 'POST') {
    try {
      const body = parseRequestBody(req);
      
      if (!body) {
        return sendError(res, 'Invalid JSON body', 400);
      }

      // Validate required fields
      const requiredFields = ['title', 'type', 'url'];
      const missingField = validateRequiredFields(body, requiredFields);
      
      if (missingField) {
        return sendError(res, missingField, 400);
      }

      // Create media
      const mediaItem = await db.createMedia(body);
      
      if (!mediaItem) {
        return sendError(res, 'Failed to create media', 500);
      }

      sendSuccess(res, mediaItem, 201);
    } catch (error) {
      console.error('Error creating media:', error);
      sendError(res, 'Failed to create media', 500);
    }
  } else if (req.method === 'PUT') {
    try {
      const body = parseRequestBody(req);
      
      if (!body || !body.id) {
        return sendError(res, 'Invalid request: missing media ID', 400);
      }

      const mediaItem = await db.updateMedia(body.id, body);
      
      if (!mediaItem) {
        return sendError(res, 'Failed to update media', 500);
      }

      sendSuccess(res, mediaItem);
    } catch (error) {
      console.error('Error updating media:', error);
      sendError(res, 'Failed to update media', 500);
    }
  } else if (req.method === 'DELETE') {
    try {
      const body = parseRequestBody(req);
      
      if (!body || !body.id) {
        return sendError(res, 'Invalid request: missing media ID', 400);
      }

      const success = await db.deleteMedia(body.id);
      
      if (!success) {
        return sendError(res, 'Failed to delete media', 500);
      }

      sendSuccess(res, { message: 'Media deleted successfully' });
    } catch (error) {
      console.error('Error deleting media:', error);
      sendError(res, 'Failed to delete media', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
