import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const mockProjects = [
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
];

export default function ProjectDashboard() {
  const auth = useAuth() as { userRole?: string; role?: string; user?: { role?: string } } | undefined;
  const userRole = auth?.userRole ?? auth?.role ?? auth?.user?.role ?? "guest";
  const [projects, setProjects] = useState(mockProjects);

  const handleCreateProject = () => {
    // Placeholder for creating a new project
    alert("Create Project functionality goes here.");
  };

  const handleEditProject = (projectId) => {
    // Placeholder for editing a project
    alert(`Edit Project functionality for project ID ${projectId} goes here.`);
  };

  const filteredProjects = projects.filter((project) => {
    if (userRole === "admin") return true; // Admin sees all projects
    if (userRole === "developer")
      return project.developers.includes("John"); // Replace "John" with the logged-in developer's name
    if (userRole === "reporter") return project.reporter === "Emily"; // Replace "Emily" with the logged-in reporter's name
    if (userRole === "ba") return project.ba === "Alex"; // Replace "Alex" with the logged-in BA's name
    return false;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Project Dashboard</h1>
        <p className="text-gray-600">
          {userRole === "admin"
            ? "Manage all projects."
            : "View your assigned projects."}
        </p>

        {userRole === "admin" && (
          <button
            onClick={handleCreateProject}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create New Project
          </button>
        )}

        <div className="space-y-4">
          {filteredProjects.map((project) => (
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
                {userRole === "admin" && (
                  <button
                    onClick={() => handleEditProject(project.id)}
                    className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
