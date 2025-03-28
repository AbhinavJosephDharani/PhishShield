module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Log request details
  console.log('Test endpoint hit:', {
    method: req.method,
    path: '/api/test',
    headers: req.headers
  });

  // Send response
  res.status(200).json({ 
    message: 'API test endpoint is working!',
    timestamp: new Date().toISOString(),
    path: '/api/test'
  });
}; 