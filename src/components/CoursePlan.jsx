import React from "react";

export default function CoursePlan({ courseSelected }) {
  return (
    <div>
      <h2 className="plan-header">Course Plan</h2>
      {courseSelected.length == 0 ? (
        <p className="alert alert-primary">
          Please Selected a course by clicking on them. Once solid blue, that
          means that course is selected and should show up in this dialog.
        </p>
      ) : (
        <ul className="list-group">
          {courseSelected.map((course) => (
            <div>
              <li
                key={course.number}
                className="bold list-group-item list-group-item-primary"
              >
                {course.term} CS {course.number}: {course.title}{" "}
                <span className="notBold list-group-item list-group-item-secondary">
                  {course.meets}{" "}
                </span>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
