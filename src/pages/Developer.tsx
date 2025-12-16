import React from "react";

export default function Developer() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
        <p className="text-gray-600">
          View assigned projects and submit clarity scores.
        </p>

        <div className="space-y-4">
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            View Assigned Projects
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            Fill Clarity Score Forms
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            Edit Submissions
          </button>
        </div>
      </div>
    </div>
  );
}
