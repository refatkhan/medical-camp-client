import React from "react";
import { FaHospital, FaUserMd, FaHeartbeat, FaHandsHelping, FaStethoscope } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white p-10">
      <div className="max-w-4xl text-center space-y-10">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-purple-700">About Our Medical Camp</h1>

        {/* Intro */}
        <p className="text-gray-700 text-lg">
          Our Medical Camp Management System is dedicated to bringing accessible and high-quality healthcare
          services to communities. We organize camps with experienced doctors, volunteers, and modern medical
          facilities to ensure everyone gets the care they deserve.
        </p>
        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {/* Mission */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <FaHospital className="text-6xl text-purple-600 mb-4"/>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To organize medical camps efficiently and bring quality healthcare closer to the people, especially
              underserved communities.
            </p>
          </div>

          {/* Vision */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <FaUserMd className="text-6xl text-purple-600 mb-4"/>
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To create a healthier future by empowering communities with access to medical care, awareness, and support.
            </p>
          </div>

          {/* Values */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <FaHeartbeat className="text-6xl text-purple-600 mb-4"/>
            <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
            <p className="text-gray-600">
              Compassion, Integrity, and Excellence guide us in every camp we organize, ensuring trust and care.
            </p>
          </div>

          {/* Community Impact */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <FaHandsHelping className="text-6xl text-purple-600 mb-4"/>
            <h2 className="text-2xl font-semibold mb-2">Community Impact</h2>
            <p className="text-gray-600">
              We connect volunteers, doctors, and donors to create a network that makes healthcare accessible
              and meaningful for everyone.
            </p>
          </div>
        </div>

        {/* Optional Team Section */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow text-left">
          <h2 className="text-3xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <FaStethoscope /> Meet Our Team
          </h2>
          <p className="text-gray-700">
            Our team is composed of experienced doctors, volunteers, and coordinators committed to delivering
            top-notch healthcare services. Every member contributes to making our medical camps organized,
            efficient, and impactful for the communities we serve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
