// dashboard/admin/users/[id]/page.tsx
export default function AdminUserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h1>Admin User Page</h1>
      <p>User ID: {id}</p>
      <p>This is the admin user page content.</p>
    </div>
  );
}