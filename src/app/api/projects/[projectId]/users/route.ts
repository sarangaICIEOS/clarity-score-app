//api/projects/[id]/users/route.ts
// get users associated with a specific project
import { NextResponse } from 'next/server';
//import { getUsersByProjectId } from '@/lib/projects';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Dummy retrieval logic (replace with real logic)
    // const users = await getUsersByProjectId(id);
    const users = [          // Dummy data
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ];

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve users for the project.' }, { status: 500 });
  }
}
