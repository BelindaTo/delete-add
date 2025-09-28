import React from "react";

export default function BookCard({ book, selected, onToggleSelect, onRemove }) {
  const { title, image, price, url } = book;

  return (
    <div
      className={`book-card ${selected ? "selected" : ""}`}
      onClick={onToggleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggleSelect()}
      aria-pressed={selected}
    >
      <button
        className="remove-btn"
        title="Remove"
        aria-label={`Remove ${title || "book"}`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        ×
      </button>

      <div className="book-image">
        <img src={image} alt={`Cover of ${title || "book"}`} />
      </div>

      <div className="book-meta">
        <div className="book-price">{price ?? "—"}</div>
        {url ? (
          <a
            className="learn-more"
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more
          </a>
        ) : (
          <button className="view-button" disabled onClick={(e) => e.stopPropagation()}>
            Learn more
          </button>
        )}
      </div>
    </div>
  );
}
