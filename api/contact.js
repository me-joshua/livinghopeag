const { 
  handleCors, 
  sendSuccess, 
  sendError, 
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

  if (req.method === 'POST') {
    try {
      const body = parseRequestBody(req);
      
      if (!body) {
        return sendError(res, 'Invalid JSON body', 400);
      }

      // Validate required fields
      const requiredFields = ['fullName', 'email', 'subject', 'message'];
      const missingField = validateRequiredFields(body, requiredFields);
      
      if (missingField) {
        return sendError(res, missingField, 400);
      }

      // Validate email format
      if (!validateEmail(body.email)) {
        return sendError(res, 'Invalid email format', 400);
      }

      // Create contact form submission
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

      sendSuccess(res, { 
        message: 'Contact form submitted successfully',
        id: contactForm.id 
      }, 201);

    } catch (error) {
      console.error('Error creating contact form:', error);
      sendError(res, 'Failed to submit contact form', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};