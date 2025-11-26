// dashboard/ba/approvals/[submissionId]/page.tsx
export default function BAApprovalPage({ params }: { params: { submissionId: string } }) {
  const { submissionId } = params;

  return (
    <div>
      <h1>BA Approval Page</h1>
      <p>Submission ID: {submissionId}</p>
      <p>This is the BA approval page content.</p>
    </div>
  );
}