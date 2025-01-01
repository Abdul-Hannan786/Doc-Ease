import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#FA7275] to-[#ffb3b5] min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-[#FA7275] tracking-wide">
            DocEase
          </h1>
          <nav>
            <Link
              href="/signin"
              className="text-[#FA7275] font-semibold px-4 py-2 hover:text-white hover:bg-[#FA7275] rounded-lg transition"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left container mx-auto px-6">
        {/* Left Section */}
        <div className="lg:w-1/2">
          <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">
            Your Health, <span className="text-[#ffe6e7]">Simplified</span>
          </h2>
          <p className="text-lg text-white mb-6">
            Book appointments with ease, manage schedules effortlessly, and take
            control of your healthcare.
          </p>
          <div className="space-x-4">
            <Link
              href="/signup"
              className="bg-white text-[#FA7275] px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 p-10">
          <Image
            src="/images/bg-2.jpg" // Replace with your image
            alt="Doctor Appointment"
            width={524}
            height={312}
            className="w-full max-w-md mx-auto rounded-xl lg:mx-0 drop-shadow-xl"
            quality={100}
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-[#FA7275] mb-6">
            Why Choose DocEase?
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                title: "Easy Appointments",
                description: "Schedule doctor visits with just a few clicks.",
              },
              {
                title: "Reminders",
                description:
                  "Never miss an appointment with timely notifications.",
              },
              {
                title: "Doctor Availability",
                description:
                  "View available slots and choose your preferred time.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#FA7275] text-white p-6 rounded-lg shadow-md w-80 hover:scale-105 transition-transform"
              >
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-[#ffb3b5] to-[#FA7275] py-12 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">What Our Users Say</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "Ali Khan",
                feedback:
                  "DocEase made booking doctor appointments so easy and stress-free!",
              },
              {
                name: "Maria Ahmed",
                feedback:
                  "I love the reminders feature. No more missing appointments!",
              },
              {
                name: "John Doe",
                feedback:
                  "A fantastic app for managing healthcare. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white text-[#FA7275] p-6 rounded-lg shadow-md w-80 hover:scale-105 transition-transform"
              >
                <p className="italic">"{testimonial.feedback}"</p>
                <h4 className="mt-4 font-bold">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FA7275] py-4 text-white text-center">
        <p>© {new Date().getFullYear()} DocEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
