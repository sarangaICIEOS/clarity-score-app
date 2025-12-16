import React, { useState } from "react";

export default function SprintConfiguration() {
  const [startDate, setStartDate] = useState("");
  const [sprintType, setSprintType] = useState("1-week");

  const handleSave = () => {
    // Placeholder for saving sprint configuration
    alert(`Sprint configured: Start Date - ${startDate}, Type - ${sprintType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Sprint Configuration</h1>
        <p className="text-gray-600">Set up sprint details for the project.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sprint Type
            </label>
            <select
              value={sprintType}
              onChange={(e) => setSprintType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="1-week">1 Week</option>
              <option value="2-week">2 Weeks</option>
              <option value="4-week">4 Weeks</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
