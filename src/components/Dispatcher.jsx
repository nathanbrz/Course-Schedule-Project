import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import TermPage from "./TermPage";
import CourseForm from "./CourseForm";

const UserFormForUrl = ({ schedule }) => {
  const { id } = useParams(); // Grabs the course ID from the URL
  return <CourseForm id={id} course={schedule[id]} />; // Passes the course data to CourseForm
};

export default function Dispatcher({ schedule }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TermPage course={schedule.courses} />} />
        <Route path="/course_form" element={<CourseForm />} />
        <Route
          path="/course_form/:id/edit"
          element={<UserFormForUrl schedule={schedule.courses} />}
        />
      </Routes>
    </BrowserRouter>
  );
}