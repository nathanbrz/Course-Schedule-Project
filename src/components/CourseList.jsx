import React from "react";
import classConflict from "../utilities/timeConflict";

export default function CourseList({
  course,
  selection,
  courseSelected,
  setCourseSelected,
}) {
  const filteredCourses = Object.values(course).filter((courseItem) =>
    courseItem.term.includes(selection)
  );

  function handleCourseSelect(item) {
    // Check if the course is already selected
    if (courseSelected.includes(item)) {
      // Remove the course from the selected list
      setCourseSelected(courseSelected.filter((x) => x !== item));
    } else {
      // Check for conflicts only when adding a new course
      const hasConflict = courseSelected.some((selectedCourse) =>
        classConflict(selectedCourse, item)
      );

      if (hasConflict) {
        alert("Course conflicts with selected course");
        return;
      }

      // Add the course to the selected list
      setCourseSelected([...courseSelected, item]);
    }
  }
  return (
    <div className="course-list-center">
      <div className="course-list ">
        {Object.values(filteredCourses).map((courseItem) => (
          <div
            key={courseItem.number}
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
