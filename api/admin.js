const { 
  handleCors, 
  sendSuccess, 
  sendError, 
  sendUnauthorized,
  sendNotFound,
  parseRequestBody, 
  validateRequiredFields 
} = require('./utils');
const { db, verifyPassword } = require('./database');
const { createAccessToken, verifyToken, getTokenFromRequest } = require('./auth');

// Middleware to verify admin token
async function requireAuth(req) {
  const token = getTokenFromRequest(req);
  
  if (!token) {
    return { error: 'No authentication token provided' };
  }
  
  const user = await verifyToken(token);
  
  if (!user) {
    return { error: 'Invalid or expired token' };
  }
  
  return { user };
}

module.exports = async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  // Parse the URL to determine the route
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace('/api/admin', '').replace('/api', '');

  // Login endpoint - no auth required
  if (path === '/login' && req.method === 'POST') {
    try {
      const body = parseRequestBody(req);
      
      if (!body) {
        return sendError(res, 'Invalid JSON body', 400);
      }

      const requiredFields = ['username', 'password'];
      const missingField = validateRequiredFields(body, requiredFields);
      
      if (missingField) {
        return sendError(res, missingField, 400);
      }

      const user = await db.getAdminUserByUsername(body.username);
      
      if (!user) {
        return sendUnauthorized(res, 'Invalid credentials');
      }

      const passwordValid = await verifyPassword(body.password, user.password_hash);
      
      if (!passwordValid) {
        return sendUnauthorized(res, 'Invalid credentials');
      }

      if (!user.is_active) {
        return sendUnauthorized(res, 'Account is disabled');
      }

      await db.updateAdminLastLogin(user.id);

      const token = createAccessToken({
        userId: user.id,
        username: user.username
      });

      return sendSuccess(res, {
        access_token: token,
        token_type: 'bearer',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });

    } catch (error) {
      console.error('Error during admin login:', error);
      return sendError(res, 'Login failed', 500);
    }
  }

  // All other routes require authentication
  const authResult = await requireAuth(req);
  if (authResult.error) {
    return sendUnauthorized(res, authResult.error);
  }

  // Contact Forms routes
  if (path === '/contact-forms') {
    if (req.method === 'GET') {
      try {
        const contactForms = await db.getAllContactForms();
        return sendSuccess(res, contactForms);
      } catch (error) {
        console.error('Error fetching contact forms:', error);
        return sendError(res, 'Failed to fetch contact forms', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Announcements routes
  if (path === '/announcements') {
    if (req.method === 'GET') {
      try {
        const announcements = await db.getAllAnnouncements();
        return sendSuccess(res, announcements);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        return sendError(res, 'Failed to fetch announcements', 500);
      }
    } else if (req.method === 'POST') {
      try {
        const body = parseRequestBody(req);
        
        if (!body) {
          return sendError(res, 'Invalid JSON body', 400);
        }

        const requiredFields = ['title', 'content'];
        const missingField = validateRequiredFields(body, requiredFields);
        
        if (missingField) {
          return sendError(res, missingField, 400);
        }

        const announcement = await db.createAnnouncement({
          title: body.title,
          content: body.content,
          priority: body.priority || 'normal',
          is_active: body.is_active !== undefined ? body.is_active : true
        });

        if (!announcement) {
          return sendError(res, 'Failed to create announcement', 500);
        }

        return sendSuccess(res, announcement, 201);
      } catch (error) {
        console.error('Error creating announcement:', error);
        return sendError(res, 'Failed to create announcement', 500);
      }
    } else if (req.method === 'PUT') {
      try {
        const body = parseRequestBody(req);
        
        if (!body || !body.id) {
          return sendError(res, 'Missing announcement ID', 400);
        }

        const announcement = await db.updateAnnouncement(body.id, {
          title: body.title,
          content: body.content,
          priority: body.priority,
          is_active: body.is_active
        });

        if (!announcement) {
          return sendError(res, 'Failed to update announcement', 500);
        }

        return sendSuccess(res, announcement);
      } catch (error) {
        console.error('Error updating announcement:', error);
        return sendError(res, 'Failed to update announcement', 500);
      }
    } else if (req.method === 'DELETE') {
      try {
        const body = parseRequestBody(req);
        
        if (!body || !body.id) {
          return sendError(res, 'Missing announcement ID', 400);
        }

        const success = await db.deleteAnnouncement(body.id);

        if (!success) {
          return sendError(res, 'Failed to delete announcement', 500);
        }

        return sendSuccess(res, { message: 'Announcement deleted successfully' });
      } catch (error) {
        console.error('Error deleting announcement:', error);
        return sendError(res, 'Failed to delete announcement', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Events routes
  if (path === '/events') {
    if (req.method === 'GET') {
      try {
        const events = await db.getAllEvents();
        return sendSuccess(res, events);
      } catch (error) {
        console.error('Error fetching events:', error);
        return sendError(res, 'Failed to fetch events', 500);
      }
    } else if (req.method === 'POST') {
      try {
        const body = parseRequestBody(req);
        
        if (!body) {
          return sendError(res, 'Invalid JSON body', 400);
        }

        const requiredFields = ['title', 'description', 'date', 'time', 'location'];
        const missingField = validateRequiredFields(body, requiredFields);
        
        if (missingField) {
          return sendError(res, missingField, 400);
        }

        const event = await db.createEvent({
          title: body.title,
          description: body.description,
          date: body.date,
          time: body.time,
          location: body.location,
          image_url: body.image_url || null,
          is_active: body.is_active !== undefined ? body.is_active : true
        });

        if (!event) {
          return sendError(res, 'Failed to create event', 500);
        }

        return sendSuccess(res, event, 201);
      } catch (error) {
        console.error('Error creating event:', error);
        return sendError(res, 'Failed to create event', 500);
      }
    } else if (req.method === 'PUT') {
      try {
        const body = parseRequestBody(req);
        
        if (!body || !body.id) {
          return sendError(res, 'Missing event ID', 400);
        }

        const event = await db.updateEvent(body.id, {
          title: body.title,
          description: body.description,
          date: body.date,
          time: body.time,
          location: body.location,
          image_url: body.image_url,
          is_active: body.is_active
        });

        if (!event) {
          return sendError(res, 'Failed to update event', 500);
        }

        return sendSuccess(res, event);
      } catch (error) {
        console.error('Error updating event:', error);
        return sendError(res, 'Failed to update event', 500);
      }
    } else if (req.method === 'DELETE') {
      try {
        const body = parseRequestBody(req);
        
        if (!body || !body.id) {
          return sendError(res, 'Missing event ID', 400);
        }

        const success = await db.deleteEvent(body.id);

        if (!success) {
          return sendError(res, 'Failed to delete event', 500);
        }

        return sendSuccess(res, { message: 'Event deleted successfully' });
      } catch (error) {
        console.error('Error deleting event:', error);
        return sendError(res, 'Failed to delete event', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Media routes
  if (path === '/media') {
    if (req.method === 'GET') {
      try {
        const media = await db.getAllMedia();
        return sendSuccess(res, media);
      } catch (error) {
        console.error('Error fetching media:', error);
        return sendError(res, 'Failed to fetch media', 500);
      }
    } else if (req.method === 'POST') {
      try {
        const body = parseRequestBody(req);
        
        if (!body) {
          return sendError(res, 'Invalid JSON body', 400);
        }

        const requiredFields = ['title', 'media_type', 'media_url'];
        const missingField = validateRequiredFields(body, requiredFields);
        
        if (missingField) {
          return sendError(res, missingField, 400);
        }

        const media = await db.createMedia({
          title: body.title,
          description: body.description || null,
          media_type: body.media_type,
          media_url: body.media_url,
          thumbnail_url: body.thumbnail_url || null,
          is_active: body.is_active !== undefined ? body.is_active : true
        });

        if (!media) {
          return sendError(res, 'Failed to create media', 500);
        }

        return sendSuccess(res, media, 201);
      } catch (error) {
        console.error('Error creating media:', error);
        return sendError(res, 'Failed to create media', 500);
      }
    } else if (req.method === 'PUT') {
      try {
        const body = parseRequestBody(req);
        
        if (!body || !body.id) {
          return sendError(res, 'Missing media ID', 400);
        }

        const media = await db.updateMedia(body.id, {
          title: body.title,
          description: body.description,
          media_type: body.media_type,
          media_url: body.media_url,
          thumbnail_url: body.thumbnail_url,
          is_active: body.is_active
        });

        if (!media) {
          return sendError(res, 'Failed to update media', 500);
        }

        return sendSuccess(res, media);
      } catch (error) {
        console.error('Error updating media:', error);
        return sendError(res, 'Failed to update media', 500);
      }
    } else if (req.method === 'DELETE') {
      try {
        const body = parseRequestBody(req);
        
        if (!body || !body.id) {
          return sendError(res, 'Missing media ID', 400);
        }

        const success = await db.deleteMedia(body.id);

        if (!success) {
          return sendError(res, 'Failed to delete media', 500);
        }

        return sendSuccess(res, { message: 'Media deleted successfully' });
      } catch (error) {
        console.error('Error deleting media:', error);
        return sendError(res, 'Failed to delete media', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Route not found
  return sendNotFound(res, 'Admin endpoint not found');
};
