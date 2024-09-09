import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CourseForm({ id, course }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", meet: "" });

  useEffect(() => {
    if (course) {
      setFormData({ title: course.title, meet: course.meets });
    } else {
      setFormData({ title: "", meet: "" });
    }
  }, [course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleCancel() {
    navigate("/");
  }
  return (
    <form className="p-5 m-5">
      <div className="mb-3">
        <label className="form-label">Course Title:</label>
        <input
          type="text"
          className="form-control"
          defaultValue={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Meeting Times:</label>
        <input
          type="text"
          className="form-control"
          defaultValue={formData.meet}
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
}
