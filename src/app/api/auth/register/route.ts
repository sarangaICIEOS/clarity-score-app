// register/route.ts
import { NextResponse } from 'next/server';
//import bcrypt from 'bcryptjs';
//import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Dummy registration logic (replace with real logic)
    // const hashedPassword = await bcrypt.hash(password, 10);
    // await prisma.user.create({
    //   data: { email, password: hashedPassword },
    // });

    return NextResponse.json({ message: 'Registration successful.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}