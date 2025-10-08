const { 
  handleCors, 
  sendSuccess, 
  sendError, 
  sendNotFound,
  parseRequestBody, 
  validateRequiredFields,
  validateEmail 
} = require('./utils');
const { db } = require('./database');

module.exports = async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  // Parse the URL to determine the route
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace('/api/public', '').replace('/api', '');

  // Health check route
  if (path === '/health') {
    if (req.method === 'GET') {
      return sendSuccess(res, {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'production'
      });
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Announcements route
  if (path === '/announcements') {
    if (req.method === 'GET') {
      try {
        const announcements = await db.getAllAnnouncements();
        return sendSuccess(res, announcements);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        return sendError(res, 'Failed to fetch announcements', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Events route
  if (path === '/events') {
    if (req.method === 'GET') {
      try {
        const events = await db.getAllEvents();
        return sendSuccess(res, events);
      } catch (error) {
        console.error('Error fetching events:', error);
        return sendError(res, 'Failed to fetch events', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Media route
  if (path === '/media') {
    if (req.method === 'GET') {
      try {
        const media = await db.getAllMedia();
        return sendSuccess(res, media);
      } catch (error) {
        console.error('Error fetching media:', error);
        return sendError(res, 'Failed to fetch media', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Church info route
  if (path === '/church-info') {
    if (req.method === 'GET') {
      try {
        // Return static church info for now
        const churchInfo = {
          name: 'Living Hope AG',
          address: 'Your Church Address',
          phone: '+968 XXXX XXXX',
          email: 'contact@livinghope.com',
          service_times: {
            sunday: '10:00 AM - 12:00 PM',
            wednesday: '7:00 PM - 8:30 PM'
          }
        };
        return sendSuccess(res, churchInfo);
      } catch (error) {
        console.error('Error fetching church info:', error);
        return sendError(res, 'Failed to fetch church info', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Contact form submission route
  if (path === '/contact') {
    if (req.method === 'POST') {
      try {
        const body = parseRequestBody(req);
        
        if (!body) {
          return sendError(res, 'Invalid JSON body', 400);
        }

        const requiredFields = ['fullName', 'email', 'subject', 'message'];
        const missingField = validateRequiredFields(body, requiredFields);
        
        if (missingField) {
          return sendError(res, missingField, 400);
        }

        if (!validateEmail(body.email)) {
          return sendError(res, 'Invalid email format', 400);
        }

        const contactForm = await db.createContactForm({
          fullName: body.fullName,
          email: body.email,
          countryCode: body.countryCode || '+968',
          phone: body.phone,
          subject: body.subject,
          message: body.message,
          contact_permission: body.contact_permission || false
        });

        if (!contactForm) {
          return sendError(res, 'Failed to create contact form', 500);
        }

        return sendSuccess(res, {
          message: 'Contact form submitted successfully',
          id: contactForm.id
        }, 201);
      } catch (error) {
        console.error('Error creating contact form:', error);
        return sendError(res, 'Failed to submit contact form', 500);
      }
    } else {
      return sendError(res, 'Method not allowed', 405);
    }
  }

  // Route not found
  return sendNotFound(res, 'Public endpoint not found');
};
