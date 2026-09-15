const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static assets from root directory
app.use(express.static(__dirname));

// Also serve public directory for any public assets
app.use(express.static(path.join(__dirname, 'public')));

// Specific routes for classic / legacy version
app.get(['/classic', '/legacy', '/old'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Clean HTML page routing (e.g., /docs -> docs.html, /pricing -> pricing.html)
app.get('/:page', (req, res, next) => {
  const htmlPath = path.join(__dirname, `${req.params.page}.html`);
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }
  next();
});

// Sub-route handling for nested HTML pages (e.g., /docs/features -> docs/features.html)
app.get('/:dir/:subpage', (req, res, next) => {
  const htmlPath = path.join(__dirname, req.params.dir, `${req.params.subpage}.html`);
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }
  next();
});

// SPA fallback to index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
