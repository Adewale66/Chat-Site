import { getSession } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const SUPERUSER_ID = process.env.NEXT_PUBLIC_SUPER_USER as string;
export async function POST(req: NextRequest) {
  const validToken = await getToken({ req });
  const { name } = await req.json();
  const user = await getSession();

  if (validToken && validToken?.name === user?.user?.name) {
    try {
      const newGroup = await prisma.group.create({
        data: {
          title: name,
          adminId: validToken.id as string,
        },
      });

      await prisma.group.update({
        where: {
          id: newGroup.id,
        },
        data: {
          userIds: {
            push: [validToken.id as string, SUPERUSER_ID],
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

      await prisma.user.update({
        where: {
          id: SUPERUSER_ID,
        },
        data: {
          groupIds: newGroup.id as string,
        },
      });
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "error" }, { status: 400 });
    }
  }
  return NextResponse.json({ message: "not authorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const user = await getSession();
  const token = await getToken({ req });

  if (token && token?.email === user?.user?.email) {
    try {
      const groups = await prisma.group.findMany({
        include: {
          messages: {
            include: {
              user: true,
            },
          },
          users: true,
          admin: true,
        },

        where: {
          userIds: {
            has: token.id as string,
          },
        },
      });
      return NextResponse.json(groups, { status: 200 });
    } catch {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  }
  return NextResponse.json({ message: "not authorized" }, { status: 401 });
}
