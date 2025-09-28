import React, { useState } from "react";
import "./App.css";
import initialBooks from "../data/books.json";               
import BookCard from "./components/bookcard.jsx";
import AddButton from "./components/addbutton.jsx";
import Modal from "./components/modal.jsx";
import AddBookForm from "./components/addbookform.jsx";

export default function App() {
  // Give each book a stable id (prefer isbn13, fallback to local id)
  const [books, setBooks] = useState(() =>
    initialBooks.map((b, i) => ({ ...b, _id: b.isbn13 || `local-${i}` }))
  );

  // Track which books are selected (by id)
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const removeBook = (id) => {
    setBooks((prev) => prev.filter((b) => b._id !== id));
    // also clear selection if it was selected
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // Modal state for "Add"
  const [open, setOpen] = useState(false);
  const handleCreate = (formData) => {
    // Per assignment: submitting should just close the modal (no add yet)
    console.log("New book (not added by assignment):", formData);
    setOpen(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Book Catalog</h1>
      </header>

      <main className="main">
        <div className="catalog-grid">
          <AddButton onClick={() => setOpen(true)} />
          {books.map((b) => (
            <BookCard
              key={b._id}
              book={b}
              selected={selectedIds.has(b._id)}
              onToggleSelect={() => toggleSelect(b._id)}
              onRemove={() => removeBook(b._id)}
            />
          ))}
        </div>
      </main>

      <footer className="footer">© Belinda To, 2025</footer>

      <Modal open={open} onClose={() => setOpen(false)} title="Create a new book">
        <AddBookForm onSubmit={handleCreate} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
