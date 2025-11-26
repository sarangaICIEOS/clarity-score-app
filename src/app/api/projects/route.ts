// api/projects/route.ts
import { NextResponse } from 'next/server';
//import { getAllProjects } from '@/lib/projects';

export async function GET() {
  try {
    // Dummy retrieval logic (replace with real logic)
    // const projects = await getAllProjects();
    const projects = [          // Dummy data
      { id: '1', name: 'Project One' },
      { id: '2', name: 'Project Two' },
    ];

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve projects.' }, { status: 500 });
  }
}
