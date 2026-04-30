const express = require('express');
const router  = express.Router();
const { authors, books } = require('../data/store');

// ─── Helper: find next available ID ───────────────────────────────
const getNextId = () =>
  authors.length > 0 ? Math.max(...authors.map(a => a.id)) + 1 : 1;

// ──────────────────────────────────────────────────────────────────
// GET /authors → Return all authors
// ──────────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.json({
    status:  'success',
    total:   authors.length,
    message: 'All authors fetched successfully',
    data:    authors,
  });
});

// ──────────────────────────────────────────────────────────────────
// GET /authors/:id → Return one author by ID
// ──────────────────────────────────────────────────────────────────
router.get('/:id', (req, res) => {
  const id     = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);

  if (!author) {
    return res.status(404).json({
      status:  'error',
      message: `Author with ID ${id} not found`,
    });
  }

  res.json({
    status:  'success',
    message: 'Author fetched successfully',
    data:    author,
  });
});

// ──────────────────────────────────────────────────────────────────
// GET /authors/:id/books → Get all books by a specific author
// ──────────────────────────────────────────────────────────────────
router.get('/:id/books', (req, res) => {
  const id     = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);

  if (!author) {
    return res.status(404).json({
      status:  'error',
      message: `Author with ID ${id} not found`,
    });
  }

  const authorBooks = books.filter(b => b.authorId === id);

  res.json({
    status:  'success',
    author:  author.name,
    total:   authorBooks.length,
    message: `Books by ${author.name} fetched successfully`,
    data:    authorBooks,
  });
});

// ──────────────────────────────────────────────────────────────────
// POST /authors → Add a new author
// ──────────────────────────────────────────────────────────────────
router.post('/', (req, res) => {
  const { name, nationality, booksWritten } = req.body;

  if (!name || !nationality) {
    return res.status(400).json({
      status:  'error',
      message: 'Missing required fields: name, nationality',
    });
  }

  const newAuthor = {
    id:           getNextId(),
    name,
    nationality,
    booksWritten: booksWritten || 0,
  };

  authors.push(newAuthor);

  res.status(201).json({
    status:  'success',
    message: 'Author added successfully',
    data:    newAuthor,
  });
});

// ──────────────────────────────────────────────────────────────────
// PUT /authors/:id → Update an author
// ──────────────────────────────────────────────────────────────────
router.put('/:id', (req, res) => {
  const id    = parseInt(req.params.id);
  const index = authors.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({
      status:  'error',
      message: `Author with ID ${id} not found`,
    });
  }

  const updatedAuthor = { ...authors[index], ...req.body, id };
  authors[index] = updatedAuthor;

  res.json({
    status:  'success',
    message: 'Author updated successfully',
    data:    updatedAuthor,
  });
});

// ──────────────────────────────────────────────────────────────────
// DELETE /authors/:id → Remove an author
// ──────────────────────────────────────────────────────────────────
router.delete('/:id', (req, res) => {
  const id    = parseInt(req.params.id);
  const index = authors.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({
      status:  'error',
      message: `Author with ID ${id} not found`,
    });
  }

  // Also remove all books by this author
  const authorBooks = books.filter(b => b.authorId === id);
  authorBooks.forEach(b => {
    const bi = books.findIndex(x => x.id === b.id);
    if (bi !== -1) books.splice(bi, 1);
  });

  const deleted = authors.splice(index, 1)[0];

  res.json({
    status:       'success',
    message:      'Author and their books deleted successfully',
    deletedAuthor: deleted,
    booksRemoved:  authorBooks.length,
  });
});

module.exports = router;