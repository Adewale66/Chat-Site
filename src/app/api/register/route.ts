import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password)
      return NextResponse.json({ error: "Missing Fields " }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user)
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (e) {
    console.log(e, "REGISTRATION ERROR");
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
