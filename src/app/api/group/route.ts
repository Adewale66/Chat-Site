import { getSession } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const validToken = await getToken({ req });
  const body = await req.json();
  const { name, description } = body;
  const user = await getSession();

  if (validToken && validToken?.name === user?.user?.name) {
    try {
      const newGroup = await prisma.group.create({
        data: {
          title: name,
          description: description,
          adminId: validToken.id as string,
        },
      });

      await prisma.group.update({
        where: {
          id: newGroup.id,
        },
        data: {
          userIds: {
            push: validToken.id as string,
          },
        },
      });

      await prisma.user.update({
        where: {
          id: validToken.id as string,
        },
        data: {
          groupIds: {
            push: newGroup.id as string,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return NextResponse.json({ message: "ok" }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const user = await getSession();
  const token = await getToken({ req });
  if (token && token?.name === user?.user?.name) {
    const groups = await prisma.group.findMany({
      where: {
        userIds: {
          has: token.id as string,
        },
      },
    });
    return NextResponse.json(groups, { status: 200 });
  }
  return NextResponse.json({ message: "not authorized" }, { status: 401 });
}
