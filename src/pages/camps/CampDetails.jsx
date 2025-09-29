import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import JoinCampModal from "./JoinCampModal ";

const CampDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [camp, setCamp] = useState(null);
    const [joined, setJoined] = useState(false);
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch single camp
    useEffect(() => {
        const fetchCamp = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps/${id}`);
                setCamp(res.data);
            } catch (err) {
                console.error("Error fetching camp:", err);
            }
        };
        fetchCamp();
    }, [id]);

    // Check if user is organizer or already joined
    useEffect(() => {
        const checkStatus = async () => {
            try {
                // 🛑 stop if camp or user not ready
                if (!camp?._id || !user?.email) return;

                // 1️⃣ fetch user role
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/role/${user.email}`
                );
                const currentUser = res.data; // { role: "organizer" | "user" }

                // 2️⃣ if organizer, block join
                if (currentUser.role === "organizer") {
                    setIsOrganizer(true);
                    return;
                }

                // 3️⃣ check if already joined
                const joinRes = await axios.get(
                    `${import.meta.env.VITE_API_URL}/registered-camps/status?campId=${camp._id}&email=${user.email}`
                );
                if (joinRes.data?.joined) {
                    setJoined(true);
                }
            } catch (error) {
                console.error("Error checking join status:", error);
            }
        };
        checkStatus();
    }, [user, camp]);
    const handleOpenModal = () => {
        if (!user) {
            alert("Please login first");
            return;
        }
        setIsModalOpen(true);
    };

    if (!camp) return <div className="text-center mt-10">Loading camp details...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
            {/* Camp Image */}
            <img
                src={camp.image || "/default-camp.jpg"}
                alt={camp.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
            />

            {/* Camp Details */}
            <h2 className="text-3xl font-bold mb-2 text-blue-600">{camp.name}</h2>
            <p className="text-gray-600 mb-1">📍 Location: {camp.location}</p>
            <p className="text-gray-600 mb-1">💰 Fees: {camp.fees} BDT</p>
            <p className="text-gray-600 mb-1">🗓️ Date: {camp.date}</p>
            <p className="text-gray-600 mb-2">⏰ Time: {camp.time}</p>
            <p className="text-gray-600 mb-2">👨‍⚕️ Professional: {camp.professional}</p>
            <p className="text-green-600 font-medium mb-4">
                👥 Participants: {camp?.participants ?? 0}
            </p>

            {/* Join Button */}
            <button
                type="button"
                onClick={handleOpenModal}
                disabled={loading || joined || isOrganizer}
                className={`w-full py-3 font-semibold text-white rounded-xl shadow-md transition
          ${joined || isOrganizer
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500"
                    }`}
            >
                {joined ? "Already Joined" : isOrganizer ? "Cannot Join" : "Join Now"}
            </button>

            {/* Join Modal */}
            <JoinCampModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={user}
                camp={camp}
                onSubmit={async (formData) => {
                    setLoading(true);
                    try {
                        const token = localStorage.getItem("access-token");
                        if (!token) {
                            alert("Session expired. Please login again.");
                            setLoading(false);
                            return;
                        }
                        const res = await axios.post(
                            `${import.meta.env.VITE_API_URL}/camps/join/${id}`,
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("access-token")}`,
                                },
                            }
                        );

                        // Update camp participants instantly
                        setCamp((prev) => ({
                            ...prev,
                            participants: res.data.camp?.participants ?? prev?.participants ?? 0,
                        }));

                        setJoined(true);           // Disable button
                        setIsModalOpen(false);     // Close modal
                        alert(res.data.message);   // Optional success message
                    } catch (err) {
                        if (err.response?.status === 403) {
                            alert("Session expired or invalid token. Please login again.")}
                        } finally {
                            setLoading(false);         // Stop loading
                        }
                    }
                }
            />
        </div>
    );
};

export default CampDetails;
