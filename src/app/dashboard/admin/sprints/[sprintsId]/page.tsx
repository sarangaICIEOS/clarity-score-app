// dashboard/admin/sprints/[projectId]/page.tsx
export default function AdminSprintsPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;

  return (
    <div>
      <h1>Admin Sprints Page</h1>
      <p>Project ID: {projectId}</p>
      <p>This is the admin sprints page content.</p>
    </div>
  );
}