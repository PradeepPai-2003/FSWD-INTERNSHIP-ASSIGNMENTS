const API_URL = '/api/books';

// DOM Elements
const bookForm = document.getElementById('book-form');
const booksContainer = document.getElementById('books-container');
const loadingEl = document.getElementById('loading');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const genreInput = document.getElementById('genre');
const idInput = document.getElementById('book-id');

// Modal Elements
const confirmModal = document.getElementById('confirm-modal');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const modalConfirmBtn = document.getElementById('modal-confirm-btn');

// State
let isEditing = false;
let pendingDeleteId = null; // Stores the ID of the book to be deleted

// Initialize
document.addEventListener('DOMContentLoaded', fetchBooks);

// ========================
// CUSTOM MODAL LOGIC
// ========================
function showDeleteModal(id) {
  pendingDeleteId = id;
  confirmModal.classList.remove('hidden');
}

function hideDeleteModal() {
  pendingDeleteId = null;
  confirmModal.classList.add('hidden');
}

// Cancel button in modal
modalCancelBtn.addEventListener('click', hideDeleteModal);

// Clicking the backdrop also closes the modal
confirmModal.addEventListener('click', (e) => {
  if (e.target === confirmModal) hideDeleteModal();
});

// Confirm button in modal → actually performs delete
modalConfirmBtn.addEventListener('click', async () => {
  if (!pendingDeleteId) return;
  const id = pendingDeleteId;
  hideDeleteModal();

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert('Error: ' + data.message);
      return;
    }
    fetchBooks(); // Refresh list after successful delete
  } catch (error) {
    console.error('Error deleting book:', error);
    alert('Network error. Could not delete book.');
  }
});

// ========================
// FORM SUBMIT (CREATE or UPDATE)
// ========================
bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookData = {
    title: titleInput.value,
    author: authorInput.value,
    year: parseInt(yearInput.value),
    genre: genreInput.value
  };

  try {
    if (isEditing) {
      // UPDATE
      await fetch(`${API_URL}/${idInput.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
    } else {
      // CREATE
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
    }
    resetForm();
    fetchBooks();
  } catch (error) {
    console.error('Error saving book:', error);
    alert('An error occurred while saving the book.');
  }
});

// Cancel Edit Handler
cancelBtn.addEventListener('click', resetForm);

// ========================
// READ: Fetch all books
// ========================
async function fetchBooks() {
  loadingEl.style.display = 'block';
  booksContainer.innerHTML = '';

  try {
    const res = await fetch(API_URL);
    const books = await res.json();

    loadingEl.style.display = 'none';

    if (books.length === 0) {
      booksContainer.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1; text-align: center; padding: 2rem;">No books found. Add one to get started!</p>';
      return;
    }

    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <div class="book-title">${escapeHtml(book.title)}</div>
        <div class="book-author">by ${escapeHtml(book.author)}</div>
        <div class="book-meta">
          <span class="badge">${escapeHtml(book.genre)}</span>
          <span class="book-year">${book.year}</span>
        </div>
        <div class="book-actions">
          <button class="btn btn-edit" id="edit-${book._id}" onclick="editBook('${book._id}', this)">✏️ Edit</button>
          <button class="btn btn-danger" id="delete-${book._id}" onclick="showDeleteModal('${book._id}')">🗑️ Delete</button>
        </div>
      `;
      // Store book data on the card for easy retrieval during edit
      card.dataset.title = book.title;
      card.dataset.author = book.author;
      card.dataset.year = book.year;
      card.dataset.genre = book.genre;
      booksContainer.appendChild(card);
    });
  } catch (error) {
    loadingEl.innerHTML = '⚠️ Error loading books. Make sure the server is running.';
    console.error('Error fetching books:', error);
  }
}

// ========================
// EDIT: Populate form for editing
// ========================
function editBook(id, btn) {
  // Find the parent card element
  const card = btn.closest('.book-card');

  isEditing = true;
  formTitle.textContent = '✏️ Edit Book';
  submitBtn.textContent = 'Update Book';
  cancelBtn.classList.remove('hidden');

  idInput.value = id;
  titleInput.value = card.dataset.title;
  authorInput.value = card.dataset.author;
  yearInput.value = card.dataset.year;
  genreInput.value = card.dataset.genre;

  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// ========================
// RESET FORM
// ========================
function resetForm() {
  isEditing = false;
  formTitle.textContent = 'Add New Book';
  submitBtn.textContent = 'Add Book';
  cancelBtn.classList.add('hidden');
  bookForm.reset();
  idInput.value = '';
}

// ========================
// HELPER: Escape HTML to prevent XSS
// ========================
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
