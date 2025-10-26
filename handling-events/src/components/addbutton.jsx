import React from "react";

export default function BookCard({ book, selected, onToggleSelect }) {
  return (
    <div
      className={`book-card ${selected ? "selected" : ""}`}
      onClick={onToggleSelect}
    >
      <h3>{book.title}</h3>
      <p className="author">by {book.author || "Unknown"}</p>
      {book.publisher && <p className="publisher">Publisher: {book.publisher}</p>}
      {book.language && <p className="language">Language: {book.language}</p>}
      {book.url && (
        <a
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="book-link"
        >
          View Book
        </a>
      )}
    </div>
  );
}