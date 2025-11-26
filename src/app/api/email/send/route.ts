// api/email/send/route.ts
import { NextResponse } from 'next/server';
//import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { to, subject, body } = await request.json();

    // Dummy email sending logic (replace with real logic)
    // await sendEmail(to, subject, body);

    return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}