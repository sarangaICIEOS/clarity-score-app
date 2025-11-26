import { NextRequest, NextResponse } from 'next/server';

// Dummy user data for demonstration
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'developer', password: 'dev123', role: 'developer' },
  { username: 'reporter', password: 'rep123', role: 'reporter' },
  { username: 'ba', password: 'ba123', role: 'ba' },
  { username: 'demo_user', password: 'demo123', role: 'developer' },
];

export async function POST(req: NextRequest) {
  try {
    const { username, password, role } = await req.json();
    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials or role' }, { status: 401 });
    }
    // Here you would set a cookie or session, etc.
    return NextResponse.json({ message: 'Login successful', user: { username, role } });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}