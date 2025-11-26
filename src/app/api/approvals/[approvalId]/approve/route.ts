
// approve a specific approval request
//import { approveRequest } from '@/lib/approvals';

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  
  try {   
    // Dummy approval logic (replace with real logic)
    // await approveRequest(id);

    return new Response(JSON.stringify({ message: 'Approval request approved successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to approve the request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};