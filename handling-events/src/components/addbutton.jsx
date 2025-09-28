import React from "react";

export default function AddButton({ onClick }) {
  return (
    <button className="add-card" onClick={onClick} aria-haspopup="dialog">
      New
    </button>
  );
}
