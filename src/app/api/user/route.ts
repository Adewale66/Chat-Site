import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getToken } from "next-auth/jwt";
import { getSession } from "@/actions/getCurrentUser";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        groups: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const getUser = await getSession();
  const body = await req.json();
  const { groupId, userId } = body;
  try {
    if (token && token.name === getUser?.user?.name) {
      await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          userIds: {
            push: userId,
          },
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          groupIds: {
            push: groupId,
          },
        },
      });
      return NextResponse.json({ message: "Group Updated" }, { status: 200 });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
