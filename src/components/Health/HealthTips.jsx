// src/components/HealthTips.jsx
import React from "react";

const healthTips = [
  { title: "Stay Hydrated", description: "Drink at least 8 glasses of water daily.", icon: "💧" },
  { title: "Eat Balanced Diet", description: "Include fruits, vegetables, proteins, and whole grains.", icon: "🥗" },
  { title: "Exercise Regularly", description: "Engage in at least 30 minutes of exercise.", icon: "🏃‍♂️" },
  { title: "Sleep Well", description: "Aim for 7-9 hours of sleep daily.", icon: "🛌" },
  { title: "Mental Wellness", description: "Practice meditation, mindfulness, or hobbies.", icon: "🧘‍♀️" },
];

const HealthTips = () => {
  return (
    <div className="py-12 bg-gradient-to-r from-green-100 to-green-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
        Health Tips for You
      </h2>

      <div className="flex overflow-x-auto space-x-6 px-6 py-4 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
        {healthTips.map((tip, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform hover:scale-105"
          >
            <div className="text-5xl mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
            <p className="text-gray-600">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;
