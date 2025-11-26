//api/sprints/[id]/clarity-forms/route.ts
import { NextResponse } from 'next/server';
//import { getClarityFormsBySprintId } from '@/lib/clarity-forms';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Dummy retrieval logic (replace with real logic)
    // const clarityForms = await getClarityFormsBySprintId(id);
    const clarityForms = [          // Dummy data
      { id: '1', name: 'Clarity Form One', sprintId: id },
      { id: '2', name: 'Clarity Form Two', sprintId: id },
    ];

    return NextResponse.json(clarityForms, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve clarity forms.' }, { status: 500 });
  }
}