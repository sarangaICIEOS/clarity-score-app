"use client";

import { useState, useEffect, ChangeEvent } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?search=${search}&page=${page}&limit=${limit}`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">User Management</h1>
      <p className="text-gray-500 mb-6">
        Manage user accounts, roles, and permissions across the system.
      </p>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearchChange}
          className="px-3 py-2 border rounded-lg shadow-sm max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => { setEditingUser(null); setShowModal(true); }}
          className="px-4 py-2 rounded-lg border bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          + Add User
        </button>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-medium">Name</th>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-left font-medium">Role</th>
              <th className="p-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: limit }).map((_, idx) => (
                  <tr key={idx} className="border-t animate-pulse">
                    <td colSpan={4} className="p-3 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ))
              : users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            {!loading && users.length === 0 && (
              <tr className="border-t">
                <td colSpan={4} className="p-3 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded-lg"
        >
          Next
        </button>
      </div>

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h2>
            <p>Form goes here...</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
