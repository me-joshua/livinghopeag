const { handleCors, sendSuccess, sendError, parseRequestBody } = require('./utils');
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
      
      const { username, email, password } = body;
      
      if (!username || !email || !password) {
        return sendError(res, 'Missing required fields: username, email, password', 400);
      }

      // Create admin user
      const user = await db.createAdminUser(username, email, password);
      
      if (!user) {
        return sendError(res, 'Failed to create admin user', 500);
      }

      sendSuccess(res, {
        message: 'Admin user created successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          is_active: user.is_active
        }
      });

    } catch (error) {
      console.error('Error creating admin user:', error);
      sendError(res, 'Failed to create admin user', 500);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};