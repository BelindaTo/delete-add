import React, { useMemo, useState } from "react";
import "./App.css";
import BookCard from "./components/bookcard.jsx";
import AddButton from "./components/addbutton.jsx";
import Modal from "./components/modal.jsx";
import AddBookForm from "./components/addbookform.jsx";

export default function App() {
  const [books, setBooks] = useState([]); // start empty
  const [open, setOpen] = useState(false);

  const selectedBook = useMemo(() => books.find((b) => b.selected), [books]);
  const selectedId = selectedBook?._id ?? null;

  const toggleSelect = (id) => {
    setBooks((prev) => {
      const clicked = prev.find((b) => b._id === id);
      const willSelect = clicked ? !clicked.selected : true;
      return prev.map((b) =>
        b._id === id ? { ...b, selected: willSelect } : { ...b, selected: false }
      );
    });
  };

  const handleCreate = ({ title, author, url }) => {
    const newBook = {
      _id: `local-${Date.now()}`,
      title: (title || "").trim() || "Untitled",
      author: (author || "").trim(),
      url: (url || "").trim(),
      selected: false,
    };
    setBooks((prev) => [newBook, ...prev]);
    setOpen(false);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    setBooks((prev) => prev.filter((b) => b._id !== selectedId));
  };

  const handleUpdate = () => {
    // intentionally empty (no-op)
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Book Catalog</h1>
      </header>

      <main className="main">
        <div className="catalog-grid">
          {/* Control column */}
          <div className="controls-column">
            <AddButton onClick={() => setOpen(true)} />
            <div className="controls-row">
              <button className="btn" onClick={handleUpdate} disabled={!selectedId}>
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={!selectedId}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Book cards */}
          {books.map((b) => (
            <BookCard
              key={b._id}
              book={b}
              selected={!!b.selected}
              onToggleSelect={() => toggleSelect(b._id)}
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
