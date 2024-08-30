import React from "react";

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
    setCourseSelected(
      courseSelected.includes(item)
        ? courseSelected.filter((x) => x !== item)
        : [...courseSelected, item]
    );
  }
  return (
    <div className="course-list-center">
      <div className="course-list ">
        {Object.values(filteredCourses).map((courseItem) => (
          <div
            key={courseItem.number}
            className={`card h-100 d-flex flex-column m-1 p-2 cardHover ${
              courseSelected.includes(courseItem) ? "selected" : ""
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
