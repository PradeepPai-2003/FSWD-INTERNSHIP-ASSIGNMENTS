// ─── Mock Database ─────────────────────────────────────────────────
// This acts as our "database" using JavaScript arrays.
// In a real project, this would be MongoDB.

const authors = [
  { id: 1, name: 'Robert C. Martin',  nationality: 'American', booksWritten: 5  },
  { id: 2, name: 'Yuval Noah Harari', nationality: 'Israeli',  booksWritten: 3  },
  { id: 3, name: 'Andrew Hunt',       nationality: 'American', booksWritten: 8  },
];

const books = [
  { id: 1, title: 'Clean Code',          authorId: 1, genre: 'Programming', price: 499, inStock: true  },
  { id: 2, title: 'Sapiens',             authorId: 2, genre: 'History',     price: 399, inStock: true  },
  { id: 3, title: 'The Pragmatic Programmer', authorId: 3, genre: 'Programming', price: 549, inStock: false },
  { id: 4, title: 'Clean Architecture',  authorId: 1, genre: 'Programming', price: 479, inStock: true  },
  { id: 5, title: 'Homo Deus',           authorId: 2, genre: 'History',     price: 349, inStock: true  },
];

module.exports = { authors, books };