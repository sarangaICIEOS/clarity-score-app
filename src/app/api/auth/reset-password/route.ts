// src/app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";

interface ResetPasswordBody {
  email: string;
  newPassword: string;
}

export async function POST(request: Request) {
  try {
    const body: ResetPasswordBody = await request.json();

    const { email, newPassword } = body;

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email and new password are required." },
        { status: 400 }
      );
    }

    // TODO: Integrate with your database and hash password
    // Example with Prisma & bcrypt:
    // import { prisma } from "../../../../lib/db";
    // import bcrypt from "bcrypt";
    // await prisma.user.update({
    //   where: { email },
    //   data: { password: await bcrypt.hash(newPassword, 10) },
    // });

    return NextResponse.json(
      { message: "Password reset successful." },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Password reset failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
