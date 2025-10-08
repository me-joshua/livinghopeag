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
      const events = await db.getAllEvents();
      sendSuccess(res, events);
    } catch (error) {
      console.error('Error fetching events:', error);
      sendError(res, 'Failed to fetch events', 500);
    }
  } else if (req.method === 'POST') {
    try {
      const body = parseRequestBody(req);
      
      if (!body) {
        return sendError(res, 'Invalid JSON body', 400);
      }

      // Validate required fields
      const requiredFields = ['title', 'date', 'time', 'location', 'description'];
      const missingField = validateRequiredFields(body, requiredFields);
      
      if (missingField) {
        return sendError(res, missingField, 400);
      }

      // Create event
      const event = await db.createEvent(body);
      
      if (!event) {
        return sendError(res, 'Failed to create event', 500);
      }

      sendSuccess(res, event, 201);
    } catch (error) {
      console.error('Error creating event:', error);
      sendError(res, 'Failed to create event', 500);
    }
  } else if (req.method === 'PUT') {
    try {
      const body = parseRequestBody(req);
      
      if (!body || !body.id) {
        return sendError(res, 'Invalid request: missing event ID', 400);
      }

      const event = await db.updateEvent(body.id, body);
      
      if (!event) {
        return sendError(res, 'Failed to update event', 500);
      }

      sendSuccess(res, event);
    } catch (error) {
      console.error('Error updating event:', error);
      sendError(res, 'Failed to update event', 500);
    }
  } else if (req.method === 'DELETE') {
    try {
      const body = parseRequestBody(req);
      
      if (!body || !body.id) {
        return sendError(res, 'Invalid request: missing event ID', 400);
      }

      const success = await db.deleteEvent(body.id);
      
      if (!success) {
        return sendError(res, 'Failed to delete event', 500);
      }

      sendSuccess(res, { message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      sendError(res, 'Failed to delete event', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
