// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'https://livinghopeag.vercel.app',
  'https://livinghopeag-*.vercel.app'
];

function setCorsHeaders(res, origin) {
  // Allow all origins for simplicity in serverless environment
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
}

function handleCors(req, res) {
  setCorsHeaders(res);
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true; // Indicates that the request was handled
  }
  
  return false; // Continue processing
}

function sendSuccess(res, data, status = 200) {
  setCorsHeaders(res);
  res.status(status).json({
    success: true,
    data
  });
}

function sendError(res, message, status = 400, details) {
  setCorsHeaders(res);
  res.status(status).json({
    success: false,
    error: message,
    ...(details && { details })
  });
}

function sendUnauthorized(res, message = 'Unauthorized') {
  sendError(res, message, 401);
}

function sendNotFound(res, message = 'Not found') {
  sendError(res, message, 404);
}

function sendMethodNotAllowed(res) {
  setCorsHeaders(res);
  res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}

function sendInternalError(res, message = 'Internal server error') {
  sendError(res, message, 500);
}

// Request validation helpers
function validateRequiredFields(data, fields) {
  for (const field of fields) {
    if (!data[field]) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// JSON parsing helper
function parseRequestBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return null;
    }
  }
  return req.body;
}

// Health check response
function sendHealthCheck(res) {
  sendSuccess(res, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
}

module.exports = {
  setCorsHeaders,
  handleCors,
  sendSuccess,
  sendError,
  sendUnauthorized,
  sendNotFound,
  sendMethodNotAllowed,
  sendInternalError,
  validateRequiredFields,
  validateEmail,
  parseRequestBody,
  sendHealthCheck
};