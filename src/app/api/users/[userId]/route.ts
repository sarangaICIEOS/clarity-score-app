//api/users/[id]/route.ts
// get user by id
import { NextResponse } from 'next/server';
//import { getUserById } from '@/lib/users';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Dummy retrieval logic (replace with real logic)
    // const user = await getUserById(id);
    const user = { id, name: 'Dummy User' }; // Dummy data

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve user.' }, { status: 500 });
  }
}
