import React from 'react'

export default function CoursePlanBtn({openModal}) {
  return (
      <div>
          <button className='btn btn-primary' onClick={openModal}>
              Course Plan
          </button>
    </div>
  )
}
