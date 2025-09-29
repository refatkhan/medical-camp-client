import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

const fetchCamps = async (page) => {
    const { data } = await axios.get("http://localhost:3000/camps", {
        params: { page, limit: ITEMS_PER_PAGE },
    });
    return data;
};

const AvailableCamps = () => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["camps", page],
        queryFn: () => fetchCamps(page),
        keepPreviousData: true,
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

    return (
        <div className="py-10 max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                Medical Camps
            </h2>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.camps.map((camp) => (
                    <div
                        key={camp._id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
                    >
                        {/* Image */}
                        <div className="overflow-hidden rounded-xl mb-4">
                            <img
                                src={camp.image || "/default-camp.jpg"}
                                alt={camp.name}
                                className="w-full h-52 object-cover transform hover:scale-105 transition duration-300"
                            />
                        </div>

                        {/* Camp Name */}
                        <h3 className="text-2xl font-bold text-blue-600 mb-3">{camp.name}</h3>

                        {/* Location */}
                        <p className="text-gray-600 mb-1 flex items-center gap-2">
                            <span>📍</span> {camp.location || "N/A"}
                        </p>

                        {/* Fees */}
                        <p className="text-gray-600 mb-1 flex items-center gap-2">
                            <span>💰</span> {camp.fees ?? "Free"} BDT
                        </p>

                        {/* Date & Time */}
                        <div className="text-gray-600 mb-1 flex flex-col gap-0.5">
                            <p className="flex items-center gap-2">
                                <span>🗓️</span> {camp.date || "TBA"}
                            </p>
                            <p className="flex items-center gap-2">
                                <span>⏰</span> {camp.time || "TBA"}
                            </p>
                        </div>

                        {/* Professional */}
                        <p className="text-gray-600 mb-2 flex items-center gap-2">
                            <span>👨‍⚕️</span> {camp.professional || "N/A"}
                        </p>

                        {/* Participants */}
                        <p className="text-green-600 font-medium mb-4 flex items-center gap-2">
                            <span>👥</span> {camp.participants ?? 0} Participants
                        </p>

                        {/* View Details Button */}
                        <button
                            onClick={() => navigate(`/camp-details/${camp._id}`)}
                            className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md hover:from-indigo-600 hover:to-blue-500 transition"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>


            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(data.total / ITEMS_PER_PAGE) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-lg ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* See All Camps
            <div className="text-center mt-8">
                <Link
                    to="/available-camps"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    See All Camps
                </Link>
            </div> */}
        </div>
    );
};

export default AvailableCamps;
