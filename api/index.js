module.exports = (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Log request details
    console.log('Root API endpoint hit:', {
      method: req.method,
      path: '/api',
      headers: req.headers
    });

    // Send response
    res.status(200).json({ 
      message: 'API root endpoint is working!',
      timestamp: new Date().toISOString(),
      path: '/api'
    });
  } catch (error) {
    console.error('Error in root API endpoint:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message
    });
  }
}; 