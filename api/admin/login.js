const { 
  handleCors, 
  sendSuccess, 
  sendError, 
  sendUnauthorized,
  parseRequestBody, 
  validateRequiredFields 
} = require('../utils');
const { db, verifyPassword } = require('../database');
const { createAccessToken } = require('../auth');

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
      const requiredFields = ['username', 'password'];
      const missingField = validateRequiredFields(body, requiredFields);
      
      if (missingField) {
        return sendError(res, missingField, 400);
      }

      // Get user from database
      const user = await db.getAdminUserByUsername(body.username);
      
      if (!user) {
        return sendUnauthorized('Invalid credentials');
      }

      // Verify password
      const passwordValid = await verifyPassword(body.password, user.password_hash);
      
      if (!passwordValid) {
        return sendUnauthorized('Invalid credentials');
      }

      // Check if user is active
      if (!user.is_active) {
        return sendUnauthorized('Account is disabled');
      }

      // Update last login
      await db.updateAdminLastLogin(user.id);

      // Create access token
      const token = createAccessToken({
        userId: user.id,
        username: user.username
      });

      sendSuccess(res, {
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
      sendError(res, 'Login failed', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};