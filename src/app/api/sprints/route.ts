// api/sprints/route.ts
import { NextResponse } from 'next/server';
//import { getAllSprints } from '@/lib/sprints';

export async function GET() {
  try {
    // Dummy retrieval logic (replace with real logic)
    // const sprints = await getAllSprints();
    const sprints = [          // Dummy data
      { id: '1', name: 'Sprint One' },
      { id: '2', name: 'Sprint Two' },
    ];

    return NextResponse.json(sprints, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve sprints.' }, { status: 500 });
  }
}