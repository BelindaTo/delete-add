import React from "react";

export default function BookCard({ book, selected, onToggleSelect }) {
  const cover = book.url || book.thumbnail || book.image || "";

  return (
    <article
      className={`book-card ${selected ? "selected" : ""}`}
      onClick={onToggleSelect}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleSelect();
        }
      }}
      role="button"
      aria-pressed={selected}
    >
      <div className="book-image">
        {cover ? (
          <img src={cover} alt={`${book.title} cover`} />
        ) : (
          <span>No Image</span>
        )}
      </div>

      <div className="book-meta">
        <div className="book-price">{book.title}</div>
        {book.author && <div className="book-price">{book.author}</div>}
      </div>
    </article>
  );
}
