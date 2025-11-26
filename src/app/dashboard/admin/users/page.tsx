// dashboard/admin/users/page.tsx

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold tracking-tight mb-4">Admin Users</h1>
      <p className="text-muted-foreground mb-8">
        Manage user accounts, roles, and permissions across the system.
      </p>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">User List</h2>
          <button className="px-4 py-2 rounded-lg border hover:bg-accent transition">
            + Add User
          </button>
        </div>

        {/* Placeholder table */}
        <div className="overflow-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Role</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">John Doe</td>
                <td className="p-3">john@example.com</td>
                <td className="p-3">Admin</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Sarah Lee</td>
                <td className="p-3">sarah@example.com</td>
                <td className="p-3">User</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>

              {/* Add more mock rows if needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
