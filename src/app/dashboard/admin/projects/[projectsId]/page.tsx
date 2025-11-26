// dashboard/admin/projects/[id]/page.tsx
export default function AdminProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h1>Admin Project Page</h1>
      <p>Project ID: {id}</p>
      <p>This is the admin project page content.</p>
    </div>
  );
}