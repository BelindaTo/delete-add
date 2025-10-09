import React, { useState } from "react";

export default function AddBookForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
  });

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="book-form"
    >
      <div className="form-grid">
        <label>Title<input name="title" value={form.title} onChange={update} /></label>
        <label>Author<input name="author" value={form.author} onChange={update} /></label>
        <label>Publisher<input name="publisher" value={form.publisher} onChange={update} /></label>
        <label>Publication year<input name="year" type="number" inputMode="numeric" value={form.year} onChange={update} /></label>
        <label>Language<input name="language" value={form.language} onChange={update} /></label>
        <label>Pages<input name="pages" type="number" inputMode="numeric" value={form.pages} onChange={update} /></label>
      </div>

      <div className="modal-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">Create</button>
      </div>
    </form>
  );
}