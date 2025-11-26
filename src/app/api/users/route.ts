// api/users/route.ts
import { NextResponse } from 'next/server';
//import { getAllUsers } from '@/lib/users';

export async function GET() {
  try {
    // Dummy retrieval logic (replace with real logic)
    // const users = await getAllUsers();
    const users = [          // Dummy data
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ];

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve users.' }, { status: 500 });
  }
}