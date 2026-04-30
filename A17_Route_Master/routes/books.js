const express = require('express');
const router  = express.Router();
const { books, authors } = require('../data/store');

// ─── Helper: find next available ID ───────────────────────────────
const getNextId = () =>
  books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

// ──────────────────────────────────────────────────────────────────
// GET /books → Return all books
// ──────────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  // Enrich each book with its author's name
  const enriched = books.map(book => {
    const author = authors.find(a => a.id === book.authorId);
    return { ...book, authorName: author ? author.name : 'Unknown' };
  });

  res.json({
    status:  'success',
    total:   enriched.length,
    message: 'All books fetched successfully',
    data:    enriched,
  });
});

// ──────────────────────────────────────────────────────────────────
// GET /books/:id → Return one book by ID
// ──────────────────────────────────────────────────────────────────
router.get('/:id', (req, res) => {
  const id   = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      status:  'error',
      message: `Book with ID ${id} not found`,
    });
  }

  const author = authors.find(a => a.id === book.authorId);
  res.json({
    status:  'success',
    message: 'Book fetched successfully',
    data:    { ...book, authorName: author ? author.name : 'Unknown' },
  });
});

// ──────────────────────────────────────────────────────────────────
// GET /books/genre/:genre → Filter books by genre
// ──────────────────────────────────────────────────────────────────
router.get('/genre/:genre', (req, res) => {
  const genre   = req.params.genre.toLowerCase();
  const filtered = books.filter(b => b.genre.toLowerCase() === genre);

  if (filtered.length === 0) {
    return res.status(404).json({
      status:  'error',
      message: `No books found in genre: ${req.params.genre}`,
    });
  }

  res.json({
    status:  'success',
    genre:   req.params.genre,
    total:   filtered.length,
    message: `Books in genre "${req.params.genre}" fetched successfully`,
    data:    filtered,
  });
});

// ──────────────────────────────────────────────────────────────────
// POST /books → Add a new book
// ──────────────────────────────────────────────────────────────────
router.post('/', (req, res) => {
  const { title, authorId, genre, price, inStock } = req.body;

  // Validate required fields
  if (!title || !authorId || !genre || price === undefined) {
    return res.status(400).json({
      status:  'error',
      message: 'Missing required fields: title, authorId, genre, price',
    });
  }

  // Check if author exists
  const author = authors.find(a => a.id === parseInt(authorId));
  if (!author) {
    return res.status(404).json({
      status:  'error',
      message: `Author with ID ${authorId} does not exist`,
    });
  }

  const newBook = {
    id:       getNextId(),
    title,
    authorId: parseInt(authorId),
    genre,
    price:    parseFloat(price),
    inStock:  inStock !== undefined ? inStock : true,
  };

  books.push(newBook);

  res.status(201).json({
    status:  'success',
    message: 'Book added successfully',
    data:    { ...newBook, authorName: author.name },
  });
});

// ──────────────────────────────────────────────────────────────────
// PUT /books/:id → Update an existing book
// ──────────────────────────────────────────────────────────────────
router.put('/:id', (req, res) => {
  const id    = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      status:  'error',
      message: `Book with ID ${id} not found`,
    });
  }

  // Merge existing data with updated fields
  const updatedBook = { ...books[index], ...req.body, id };
  books[index] = updatedBook;

  res.json({
    status:  'success',
    message: 'Book updated successfully',
    data:    updatedBook,
  });
});

// ──────────────────────────────────────────────────────────────────
// DELETE /books/:id → Remove a book
// ──────────────────────────────────────────────────────────────────
router.delete('/:id', (req, res) => {
  const id    = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      status:  'error',
      message: `Book with ID ${id} not found`,
    });
  }

  const deleted = books.splice(index, 1)[0];

  res.json({
    status:  'success',
    message: 'Book deleted successfully',
    data:    deleted,
  });
});

module.exports = router;