import React, { useState } from "react";

const JoinCampModal = ({ isOpen, onClose, user, camp, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        campName: camp?.name || "",
        campFees: camp?.fees || "",
        age: "",
        phone: "",
        sex: "",
        emergencyContact: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-2xl font-bold text-blue-600">Join Camp</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* User Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                disabled
                                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Camp Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Camp Name</label>
                            <input
                                type="text"
                                name="campName"
                                value={formData.campName}
                                disabled
                                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Camp Fees</label>
                            <input
                                type="text"
                                name="campFees"
                                value={formData.campFees}
                                disabled
                                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Extra Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Sex</label>
                            <select
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Emergency Contact</label>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                placeholder="Enter emergency contact"
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 mr-2 rounded-lg border hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-500 transition"
                        >
                            Confirm Join
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinCampModal;
