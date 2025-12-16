import React from "react";

export default function BA() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">BA Dashboard</h1>
        <p className="text-gray-600">
          Oversee project clarity and approve submissions.
        </p>

        <div className="space-y-4">
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            View Assigned Projects
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            Approve or Reject Submissions
          </button>
        </div>
      </div>
    </div>
  );
}
