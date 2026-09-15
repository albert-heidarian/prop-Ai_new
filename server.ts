const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Health check endpoints for Cloud Run
app.get(['/healthz', '/_health', '/health'], (_req, res) => {
  res.status(200).send('OK');
});

// Specific routes for classic / legacy version
app.get(['/classic', '/legacy', '/old'], (_req, res) => {
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

// Serve static assets from root directory without directory redirects
app.use(express.static(__dirname, { redirect: false }));

// Also serve public directory for any public assets
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback to index.html for all other routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
