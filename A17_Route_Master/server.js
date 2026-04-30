const express = require('express');
const app     = express();
const PORT    = 3000;

// ─── Middleware ────────────────────────────────────────────────────
app.use(express.json()); // Parses incoming JSON request bodies

// ─── Import Routes ─────────────────────────────────────────────────
const bookRoutes   = require('./routes/books');
const authorRoutes = require('./routes/authors');

// ─── Mount Routes ──────────────────────────────────────────────────
app.use('/books',   bookRoutes);    // All /books/* routes
app.use('/authors', authorRoutes);  // All /authors/* routes

// ─── Root Route ────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status:  'success',
    message: '📚 Welcome to Route Master — Bookstore API',
    version: '1.0.0',
    endpoints: {
      books: {
        'GET    /books':              'Get all books',
        'GET    /books/:id':          'Get book by ID',
        'GET    /books/genre/:genre': 'Get books by genre',
        'POST   /books':              'Add a new book',
        'PUT    /books/:id':          'Update a book',
        'DELETE /books/:id':          'Delete a book',
      },
      authors: {
        'GET    /authors':            'Get all authors',
        'GET    /authors/:id':        'Get author by ID',
        'GET    /authors/:id/books':  'Get all books by author',
        'POST   /authors':            'Add a new author',
        'PUT    /authors/:id':        'Update an author',
        'DELETE /authors/:id':        'Delete author + their books',
      },
    },
  });
});

// ─── 404 Handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status:  'error',
    message: `Route "${req.method} ${req.originalUrl}" not found`,
    hint:    'Visit http://localhost:3000 to see all available routes',
  });
});

// ─── Start Server ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n─────────────────────────────────────────────');
  console.log('  📚 Route Master — Bookstore API');
  console.log('─────────────────────────────────────────────');
  console.log(`  ✅ Server running at http://localhost:${PORT}`);
  console.log('\n  📖 BOOK ROUTES:');
  console.log(`  GET    http://localhost:${PORT}/books`);
  console.log(`  GET    http://localhost:${PORT}/books/1`);
  console.log(`  GET    http://localhost:${PORT}/books/genre/Programming`);
  console.log(`  POST   http://localhost:${PORT}/books`);
  console.log(`  PUT    http://localhost:${PORT}/books/1`);
  console.log(`  DELETE http://localhost:${PORT}/books/1`);
  console.log('\n  ✍️  AUTHOR ROUTES:');
  console.log(`  GET    http://localhost:${PORT}/authors`);
  console.log(`  GET    http://localhost:${PORT}/authors/1`);
  console.log(`  GET    http://localhost:${PORT}/authors/1/books`);
  console.log(`  POST   http://localhost:${PORT}/authors`);
  console.log(`  PUT    http://localhost:${PORT}/authors/1`);
  console.log(`  DELETE http://localhost:${PORT}/authors/1`);
  console.log('─────────────────────────────────────────────\n');
});