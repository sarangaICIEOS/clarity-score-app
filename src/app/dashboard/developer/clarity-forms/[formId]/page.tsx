// dashboard/developer/clarity-forms/[formId]/page.tsx
export default function ClarityFormPage({ params }: { params: { formId: string } }) {
  return (
    <div>
      <h1>Clarity Form Page</h1>
      <p>This is the clarity form page for form ID: {params.formId}</p>
    </div>
  );
}