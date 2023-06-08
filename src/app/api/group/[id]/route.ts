import { getSession } from "@/actions/getCurrentUser";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest) {
  const user = await getSession();
  const token = await getToken({ req });
  const id = req.url.slice(req.url.lastIndexOf("/") + 1).replaceAll("%20", " ");

  if (token && token.email === user?.user?.email) {
    try {
      const group = await prisma.group.findFirst({
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
          title: id,
          userIds: {
            has: token.id as string,
          },
        },
      });

      if (group) return NextResponse.json(group, { status: 200 });
      return NextResponse.json({ message: "not found" }, { status: 404 });
    } catch {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "not authorized" }, { status: 401 });
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const user = await getSession();

  if (token && token?.name === user?.user?.name) {
    try {
      const group = await prisma.group.findUnique({
        include: {
          users: true,
        },
        where: {
          id: id,
        },
      });

      if (group) {
        const userIds = group.users.map((user) => user.id);

        userIds.forEach(async (id) => {
          const updatedUser = await prisma.user.findUnique({
            where: {
              id: id,
            },
          });
          const updatedGroupIds = updatedUser?.groupIds?.filter(
            (groupId) => groupId !== group.id
          );

          await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              groupIds: updatedGroupIds,
            },
          });
        });

        await prisma.group.delete({
          where: {
            id: group.id,
          },
        });
        return NextResponse.json({ message: "ok" }, { status: 200 });
      }
      return NextResponse.json({ message: "not found" }, { status: 404 });
    } catch (error) {
      console.log(error);

      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "not authorized" }, { status: 401 });
}
