// api/sprints/[id]/route.ts
import { NextResponse } from 'next/server';
//import { getSprintById } from '@/lib/sprints';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Dummy retrieval logic (replace with real logic)
    // const sprint = await getSprintById(id);
    const sprint = { id, name: 'Sample Sprint' }; // Dummy data

    return NextResponse.json(sprint, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve the sprint.' }, { status: 500 });
  }
}