import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../hooks/useFormData";

const validateCourseData = (key, val) => {
  switch (key) {
    case "title":
      return val.length >= 2 ? "" : "Title must be at least two characters";
    case "meet":
      // Allow valid days (like MWF) and time range (start-end)
      const meetRegex = /^[MTWRF]{1,5} \d{2}:\d{2}-\d{2}:\d{2}$/;
      return meetRegex.test(val)
        ? ""
        : "Meeting time must contain days and start-end in 24h format, e.g., MWF 12:00-13:20";
    default:
      return "";
  }
};

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className={`form-control ${state.errors?.[name] ? "is-invalid" : ""}`}
      id={name}
      name={name}
      value={state.values?.[name] || ""}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

export default function CourseForm({ id, course }) {
  const navigate = useNavigate();

  const [state, change, setState] = useFormData(validateCourseData, {
    title: "",
    meet: "",
  });

  useEffect(() => {
    if (course) {
      // Preload formData if course data exists by directly setting the state
      setState({
        values: {
          title: course.title || "",
          meet: course.meets || "",
        },
        errors: {},
      });
    }
  }, [course, setState]);

  function handleCancel() {
    navigate("/");
  }

  return (
    <form className="p-5 m-5">
      <InputField
        name="title"
        text="Course Title"
        state={state}
        change={change}
      />
      <InputField
        name="meet"
        text="Meeting Information"
        state={state}
        change={change}
      />
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
