import React, { useState } from "react";

const scoringCategories = [
  { id: "documentation", label: "Documentation" },
  { id: "technical", label: "Technical" },
  { id: "review", label: "Review" },
  { id: "collaboration", label: "Collaboration" },
];

export default function ClarityScoreForm() {
  const [scores, setScores] = useState(
    scoringCategories.reduce((acc, category) => {
      acc[category.id] = 0;
      return acc;
    }, {})
  );

  const handleScoreChange = (categoryId, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [categoryId]: parseFloat(value),
    }));
  };

  const handleSubmit = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const averageScore = (totalScore / scoringCategories.length).toFixed(2);
    alert(`Scores submitted! Average Clarity Score: ${averageScore}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Clarity Score Form</h1>
        <p className="text-gray-600">
          Submit your clarity scores for the current sprint.
        </p>

        <div className="space-y-4">
          {scoringCategories.map((category) => (
            <div key={category.id}>
              <label className="block text-sm font-medium text-gray-700">
                {category.label}
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={scores[category.id]}
                onChange={(e) => handleScoreChange(category.id, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Scores
          </button>
        </div>
      </div>
    </div>
  );
}
