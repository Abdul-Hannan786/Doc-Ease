import React from 'react'

const DoctorAppointments = () => {
  return (
    <div className="page-container">
      <section className="w-full">
        <div className="total-size-section">
          <h1 className="h1 capitalize">All Appointments</h1>
          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200 ">Sort by:</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DoctorAppointments