import React, { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import CoursePlanBtn from "./CoursePlanBtn";
import Modal from "./Modal";
import CoursePlan from "./CoursePlan";

export default function TermPage({ course }) {
  const [selection, setSelection] = useState("Fall");
  const [courseSelected, setCourseSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      <div className="btn-container">
        <div className="term-selectors">
          <TermSelector
            term={"Fall"}
            selection={selection}
            setSelection={setSelection}
          />
          <TermSelector
            term={"Winter"}
            selection={selection}
            setSelection={setSelection}
          />

          <TermSelector
            term={"Spring"}
            selection={selection}
            setSelection={setSelection}
          />
        </div>
        <CoursePlanBtn openModal={openModal} />
        <Modal open={modalOpen} close={closeModal}>
          <CoursePlan courseSelected={courseSelected} />
        </Modal>
      </div>

      <CourseList
        course={course}
        selection={selection}
        courseSelected={courseSelected}
        setCourseSelected={setCourseSelected}
      />
    </div>
  );
}
