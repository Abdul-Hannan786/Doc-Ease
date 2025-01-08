import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PatientDashboard = () => {
  const dummyData = [
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
  ];

  return (
    <div className="page-container">
      <section className="w-full">
        <div className="total-size-section">
          <h1 className="h1 capitalize">Dashboard</h1>
          <div className="sort-container">
            <Link href="/patient/all-doctors">
              <Button className="bg-brand hover:bg-brand-100 transition-all rounded-3xl button">See All Doctors</Button>
            </Link>
          </div>
        </div>
      </section>
      <div>
        <h3 className="text-2xl font-semibold text-start capitalize">
          Find the doctor you need
        </h3>
      </div>
      {dummyData.length > 0 ? (
        <section className="file-list">
          {dummyData.map(
            ({
              fullname,
              picture,
              age,
              specialization,
              experience,
              gender,
              hospital,
              address,
              number,
              fees,
            }) => (
              <div key={fullname}>
                <h1>{fullname}</h1>
                <h1>{age} years old</h1>
                <h1>{specialization}</h1>
                <h1>{experience}</h1>
                <h1>{gender}</h1>
                <h1>{hospital}</h1>
                <h1>{address}</h1>
                <h1>{number}</h1>
                <h1>{picture}</h1>
                <h1>{fees} PKR</h1>
              </div>
            )
          )}
        </section>
      ) : (
        <p className="empty-list">No doctors found</p>
      )}
    </div>
  );
};

export default PatientDashboard;
