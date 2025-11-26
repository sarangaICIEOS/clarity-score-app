// dashboard/reporter/submissions/[submissionId]/page.tsx
export default function ReporterSubmissionPage({ params }: { params: { submissionId: string } }) {
  const { submissionId } = params;

  return (
    <div>
      <h1>Reporter Submission Page</h1>
      <p>Submission ID: {submissionId}</p>
      <p>This is the reporter submission page content.</p>
    </div>
  );
}