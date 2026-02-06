// Local development server
// Imports the same Express app used on Vercel, adds static file serving + listen

require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
const path = require('path');
const express = require('express');
const app = require('./api/index');

// Serve static files (Vercel handles this via vercel.json in production)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n  AI Fluency Dashboard running at: http://localhost:${PORT}\n`);
  console.log('  Open this URL in your browser to view the dashboard.\n');
});
