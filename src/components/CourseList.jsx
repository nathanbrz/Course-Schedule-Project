import React from "react";
import classConflict from "../utilities/timeConflict";
import { useNavigate } from 'react-router-dom';

export default function CourseList({
  course, // course is the full schedule object
  selection,
  courseSelected,
  setCourseSelected,
}) {
  const filteredCourses = Object.entries(course)
    .filter(([courseKey, courseItem]) => courseItem.term.includes(selection));

  function handleCourseSelect(item) {
    if (courseSelected.includes(item)) {
      setCourseSelected(courseSelected.filter((x) => x !== item));
    } else {
      const hasConflict = courseSelected.some((selectedCourse) =>
        classConflict(selectedCourse, item)
      );

      if (hasConflict) {
        alert("Course conflicts with selected course");
        return;
      }

      setCourseSelected([...courseSelected, item]);
    }
  }

  const navigate = useNavigate();

  // Pass the course key (course ID) to the navigate function
  function handleEdit(courseKey) {
    navigate(`/course_form/${courseKey}/edit`);
  }

  return (
    <div className="course-list-center">
      <div className="course-list ">
        {filteredCourses.map(([courseKey, courseItem]) => (
          <div
            key={courseKey}
            className={`card h-100 d-flex flex-column m-1 p-2 cardHover ${
              courseSelected.includes(courseItem) ? "selected" : ""
            } ${
              courseSelected.some((selectedCourse) =>
                classConflict(selectedCourse, courseItem)
              ) && !courseSelected.includes(courseItem)
                ? "disabled"
                : ""
            } `}
            onClick={() => handleCourseSelect(courseItem)}
          >
            {/* Pass the course key (like "F101") to the handleEdit function */}
            <div className="edit-container btn btn-primary" onClick={() => handleEdit(courseKey)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pen-fill"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
              </svg>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                {courseItem.term} CS {courseItem.number}
              </h5>

              <p className="card-text">{courseItem.title} </p>
            </div>
            <div className="card-footer bg-transparent">
              {courseItem.meets}{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}