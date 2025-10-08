const jwt = require('jsonwebtoken');
const { db } = require('./database');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
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

    const user = await db.getAdminUserByUsername(decoded.username);
    
    if (!user || !user.is_active) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7);
}

async function requireAuth(req, res, next) {
  const token = getTokenFromRequest(req);
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No authentication token provided'
    });
  }
  
  const user = await verifyToken(token);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
  
  req.user = user;
  next();
}

module.exports = {
  createAccessToken,
  verifyToken,
  getTokenFromRequest,
  requireAuth
};
