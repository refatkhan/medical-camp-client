import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";

// Fetch camps
const fetchCamps = async () => {
  const res = await axios.get("http://localhost:3000/popular-camps");
  return res.data;
};

const MedicalCamp = () => {
  const { data: camps = [], isLoading, isError } = useQuery({
    queryKey: ["camps"],
    queryFn: fetchCamps,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className="text-center py-10">
        <div className="loader mb-2"></div>
        <p>Loading camps...</p>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-semibold">Failed to load camps.</p>
      </div>
    );

  const popularCamps = [...camps]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 6);

  return (
    <div className="py-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Popular Medical Camps
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {popularCamps.map((camp) => (
          <div
            key={camp._id}
            className="border rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
          >
            <img
              src={camp.image || "/default-camp.jpg"}
              alt={camp.campName}
              className="w-full h-48 object-cover rounded-t-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {camp.campName}
            </h3>
            <p className="text-gray-600 mb-1">📍 {camp.location || "N/A"}</p>
            <p className="text-gray-600 mb-1">💰 ${camp.fees ?? "Free"}</p>
            <p className="text-gray-600 mb-1">🗓️ {camp.dateTime || "TBA"}</p>
            <p className="text-gray-600 mb-1">👨‍⚕️ {camp.doctorName || "N/A"}</p>
            <p className="text-green-600 font-medium mb-2">
              👥 {camp.participants || 0} Participants
            </p>
            <p className="text-gray-500 text-sm line-clamp-2">
              {camp.description || "No description available."}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/available-camps"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          See All Camps
        </Link>
      </div>
    </div>
  );
};

export default MedicalCamp;
