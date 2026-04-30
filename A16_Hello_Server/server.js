// ─── Import Express ───────────────────────────────────────────────
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware: Parse JSON bodies ────────────────────────────────
app.use(express.json());
app.use(express.static('public'));

// ─── Middleware: Request logging ──────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── Route 1: Home ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    route: '/',
    message: '👋 Welcome to Hello Server! Your server is running perfectly.',
  });
});

// ─── Route 2: About ───────────────────────────────────────────────
app.get('/about', (req, res) => {
  res.json({
    status: 'success',
    route: '/about',
    message: '📖 This is a simple Node.js + Express server built for learning routing.',
    author: 'Your Name',
    version: '1.0.0',
  });
});

// ─── Route 3: Contact ─────────────────────────────────────────────
app.get('/contact', (req, res) => {
  res.json({
    status: 'success',
    route: '/contact',
    message: '📬 Reach us at hello@example.com or call +91-9999999999.',
  });
});

// ─── Route 4: Services ────────────────────────────────────────────
app.get('/services', (req, res) => {
  res.json({
    status: 'success',
    route: '/services',
    message: '🛠️ We offer Web Development, API Design, and Cloud Hosting.',
    services: ['Web Development', 'API Design', 'Cloud Hosting'],
  });
});

// ─── Route 5: Status / Health Check ──────────────────────────────
app.get('/status', (req, res) => {
  res.json({
    status: 'success',
    route: '/status',
    message: '✅ Server is healthy and running!',
    uptime: `${Math.floor(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
  });
});

// ─── Route 6: Greet with a name (Dynamic Route) ───────────────────
app.get('/greet/:name', (req, res) => {
  let { name } = req.params;
  
  // Validate and sanitize input
  name = name.trim().replace(/[^a-zA-Z\s]/g, '');
  
  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: '❌ Please provide a valid name (letters and spaces only).',
      example: '/greet/John Doe',
    });
  }
  
  res.json({
    status: 'success',
    route: `/greet/${name}`,
    message: `🎉 Hello, ${name}! Welcome to our server. Great to have you here!`,
  });
});

// ─── 404 Handler: Unknown Routes ──────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 'NOT_FOUND',
    message: `❌ Route "${req.originalUrl}" not found on this server.`,
    hint: 'Available routes: /, /about, /contact, /services, /status, or /greet/yourname',
    method: req.method,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    status: 'error',
    code: 'INTERNAL_SERVER_ERROR',
    message: err.message || 'An unexpected error occurred.',
  });
});

// ─── Start the Server ─────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log('─────────────────────────────────────────');
  console.log(`  ✅ Server is running!`);
  console.log(`  🌐 Open: http://localhost:${PORT}`);
  console.log(`  📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('─────────────────────────────────────────');
  console.log('  Available Routes:');
  console.log(`  → GET  http://localhost:${PORT}/`);
  console.log(`  → GET  http://localhost:${PORT}/about`);
  console.log(`  → GET  http://localhost:${PORT}/contact`);
  console.log(`  → GET  http://localhost:${PORT}/services`);
  console.log(`  → GET  http://localhost:${PORT}/status`);
  console.log(`  → GET  http://localhost:${PORT}/greet/YourName`);
  console.log('─────────────────────────────────────────');
});

// ─── Graceful Shutdown ────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('⚠️  SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});