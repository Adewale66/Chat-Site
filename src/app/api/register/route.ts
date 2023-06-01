import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password)
      return new NextResponse("Missing Fields", { status: 400 });

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
    return new NextResponse("Error", { status: 500 });
  }
}
