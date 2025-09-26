import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Placeholder for backend submission
        console.log("Form Submitted:", formData);
        alert("Thank you for contacting us!");
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-purple-50 to-white p-6">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">Contact Us</h1>

                {/* Contact Info */}
                <div className="flex flex-col space-y-4 mb-6 text-gray-700">
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-pink-600" /> 123 Medical St, Health City
                    </div>
                    <div className="flex items-center gap-3">
                        <FaPhone className="text-pink-600" /> +123 456 7890
                    </div>
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-pink-600" /> support@medicalcamp.com
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
