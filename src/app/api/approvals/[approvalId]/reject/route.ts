// reject approval request
//import { rejectRequest } from '@/lib/approvals';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Dummy rejection logic (replace with real logic)
    // await rejectRequest(id);
    return NextResponse.json({ message: 'Approval request rejected successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reject the request.' }, { status: 500 });
  }
}
