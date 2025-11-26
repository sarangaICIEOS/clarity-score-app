// api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
//import { getProjectById } from '@/lib/projects';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Dummy retrieval logic (replace with real logic)
    // const project = await getProjectById(id);
    const project = { id, name: 'Sample Project' }; // Dummy data

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve the project.' }, { status: 500 });
  }
}