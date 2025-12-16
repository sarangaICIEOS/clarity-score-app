import React, { useState } from "react";

export default function Admin() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-Commerce Platform",
      sprintType: "2-week",
      startDate: "Monday",
      developers: ["John", "Sarah"],
      reporter: "Emily",
      ba: "Alex",
    },
    {
      id: 2,
      name: "Mobile App Redesign",
      sprintType: "1-week",
      startDate: "Tuesday",
      developers: ["Mike"],
      reporter: "Lisa",
      ba: "David",
    },
  ]);

  const handleCreateProject = () => {
    // Placeholder for creating a new project
    alert("Create Project functionality goes here.");
  };

  const handleEditProject = (projectId) => {
    // Placeholder for editing a project
    alert(`Edit Project functionality for project ID ${projectId} goes here.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage the system, projects, and users.</p>

        {/* Project Management Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Project Management
          </h2>
          <button
            onClick={handleCreateProject}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create New Project
          </button>

          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Sprint Type: {project.sprintType} · Start Date:{" "}
                      {project.startDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      Developers: {project.developers.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Reporter: {project.reporter} · BA: {project.ba}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEditProject(project.id)}
                    className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Admin Actions */}
        <div className="space-y-4">
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            Add Users to the System
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            Assign Roles within Projects
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            Configure Sprint Dates
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            View Project History
          </button>
        </div>
      </div>
    </div>
  );
}
