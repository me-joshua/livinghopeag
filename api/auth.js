const jwt = require('jsonwebtoken');
const { db } = require('./database');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'change-this-secret-key-in-production';
const JWT_ALGORITHM = 'HS256';
const ACCESS_TOKEN_EXPIRE_MINUTES = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_MINUTES || '1440');

function createAccessToken(data) {  
  return jwt.sign(
    {
      userId: data.userId,
      username: data.username
    },
    JWT_SECRET_KEY,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: `${ACCESS_TOKEN_EXPIRE_MINUTES}m`
    }
  );
}

async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY, {
      algorithms: [JWT_ALGORITHM]
    });

    // Get user from database to ensure they still exist and are active
    const user = await db.getAdminUserByUsername(decoded.username);
    
    if (!user || !user.is_active) {
      return null;
    }

    return user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log('Token expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log('Invalid token');
    } else {
      console.error('Token verification error:', error);
    }
    return null;
  }
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return null;
  }

  // Bearer token format: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

async function authenticateRequest(req) {
  const token = getTokenFromRequest(req);
  
  if (!token) {
    return null;
  }

  return await verifyToken(token);
}

module.exports = {
  createAccessToken,
  verifyToken,
  getTokenFromRequest,
  authenticateRequest
};