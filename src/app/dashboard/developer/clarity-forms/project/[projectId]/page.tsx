// dashboard/developer/clarity-forms/project/[projectId]/page.tsx
export default function ClarityFormsProjectPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;

  return (
    <div>
      <h1>Clarity Forms for Project</h1>
      <p>Project ID: {projectId}</p>
      <p>This is the clarity forms page for the specified project.</p>
    </div>
  );
}
