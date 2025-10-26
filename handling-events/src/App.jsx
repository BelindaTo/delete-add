import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import BookCard from "./components/bookcard.jsx";
import AddButton from "./components/addbutton.jsx";
import Modal from "./components/modal.jsx";
import AddBookForm from "./components/addbookform.jsx";

export default function App() {
  const [books, setBooks] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [filterPublisher, setFilterPublisher] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");

  // Load books from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("bookCatalog");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBooks(parsed);
      } catch (e) {
        console.error("Failed to parse stored books:", e);
      }
    }
  }, []);

  // Save books to localStorage whenever they change
  useEffect(() => {
    if (books.length >= 0) {
      localStorage.setItem("bookCatalog", JSON.stringify(books));
    }
  }, [books]);

  const selectedBook = useMemo(() => books.find((b) => b.selected), [books]);
  const selectedId = selectedBook?._id ?? null;

  // Get unique publishers and languages for filters
  const publishers = useMemo(() => {
    const pubs = [...new Set(books.map((b) => b.publisher).filter(Boolean))];
    return pubs.sort();
  }, [books]);

  const languages = useMemo(() => {
    const langs = [...new Set(books.map((b) => b.language).filter(Boolean))];
    return langs.sort();
  }, [books]);

  // Filter books based on criteria
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      if (filterPublisher && b.publisher !== filterPublisher) return false;
      if (filterLanguage && b.language !== filterLanguage) return false;
      return true;
    });
  }, [books, filterPublisher, filterLanguage]);

  const toggleSelect = (id) => {
    setBooks((prev) => {
      const clicked = prev.find((b) => b._id === id);
      const willSelect = clicked ? !clicked.selected : true;
      return prev.map((b) =>
        b._id === id ? { ...b, selected: willSelect } : { ...b, selected: false }
      );
    });
  };

  const handleCreate = ({ title, author, url, publisher, language }) => {
    const newBook = {
      _id: `local-${Date.now()}`,
      title: (title || "").trim() || "Untitled",
      author: (author || "").trim(),
      url: (url || "").trim(),
      publisher: (publisher || "").trim(),
      language: (language || "").trim(),
      selected: false,
    };
    setBooks((prev) => [newBook, ...prev]);
    setOpenAdd(false);
  };

  const handleUpdate = ({ title, author, url, publisher, language }) => {
    if (!selectedId) return;
    setBooks((prev) =>
      prev.map((b) =>
        b._id === selectedId
          ? {
              ...b,
              title: (title || "").trim() || "Untitled",
              author: (author || "").trim(),
              url: (url || "").trim(),
              publisher: (publisher || "").trim(),
              language: (language || "").trim(),
            }
          : b
      )
    );
    setOpenEdit(false);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    setBooks((prev) => prev.filter((b) => b._id !== selectedId));
  };

  const clearFilters = () => {
    setFilterPublisher("");
    setFilterLanguage("");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Book Catalog</h1>
      </header>

      <main className="main">
        {/* Filters Section */}
        <div className="filters">
          <h3>Filter Books</h3>
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="filterPublisher">Publisher</label>
              <select
                id="filterPublisher"
                value={filterPublisher}
                onChange={(e) => setFilterPublisher(e.target.value)}
              >
                <option value="">All Publishers</option>
                {publishers.map((pub) => (
                  <option key={pub} value={pub}>
                    {pub}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filterLanguage">Language</label>
              <select
                id="filterLanguage"
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {(filterPublisher || filterLanguage) && (
              <button className="btn-clear" onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="catalog-grid">
          {/* Control column */}
          <div className="controls-column">
            <AddButton onClick={() => setOpenAdd(true)} />
            <div className="controls-row">
              <button
                className="btn"
                onClick={() => setOpenEdit(true)}
                disabled={!selectedId}
              >
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
          {filteredBooks.map((b) => (
            <BookCard
              key={b._id}
              book={b}
              selected={!!b.selected}
              onToggleSelect={() => toggleSelect(b._id)}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && books.length > 0 && (
          <p style={{ textAlign: "center", color: "#7f8c8d", marginTop: "2rem" }}>
            No books match the current filters.
          </p>
        )}

        {books.length === 0 && (
          <p style={{ textAlign: "center", color: "#7f8c8d", marginTop: "2rem" }}>
            No books yet. Click "Add Book" to get started!
          </p>
        )}
      </main>

      <footer className="footer">© Belinda To, 2025</footer>

      {/* Add Book Modal */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Create a new book">
        <AddBookForm onSubmit={handleCreate} onCancel={() => setOpenAdd(false)} />
      </Modal>

      {/* Edit Book Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Edit book">
        <AddBookForm
          onSubmit={handleUpdate}
          onCancel={() => setOpenEdit(false)}
          initialData={selectedBook}
        />
      </Modal>
    </div>
  );
}