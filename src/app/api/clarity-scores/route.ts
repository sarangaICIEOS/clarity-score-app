// clarity-scores/routes.ts
// get all clarity scores
import { NextResponse } from 'next/server';
//import { getAllClarityScores } from '@/lib/clarity-scores';

export async function GET() {
  try {
    // Dummy retrieval logic (replace with real logic)
    // const clarityScores = await getAllClarityScores();
    const clarityScores = [
      { id: '1', score: 85, approved: false },
      { id: '2', score: 90, approved: true },
    ]; // Dummy data

    return NextResponse.json(clarityScores, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve clarity scores.' }, { status: 500 });
  }
}