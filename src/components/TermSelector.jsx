import React from "react";

export default function TermSelector({term, selection, setSelection}) {
  return (
    <div>
      <input
        type="radio"
        id={term}
        className="btn-check"
        checked={term === selection}
        autoComplete="off"
        onChange={() => setSelection(term)}
      />
      <label className="btn btn-primary mb-1 p-2" htmlFor={term}>
        {term}
      </label>
    </div>
  );
}
