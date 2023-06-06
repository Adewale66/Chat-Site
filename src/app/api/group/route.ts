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
      return NextResponse.json({ message: "error" }, { status: 400 });
    }
    return NextResponse.json({ message: "ok" }, { status: 200 });
  }
  return NextResponse.json({ message: "not authorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const user = await getSession();
  const token = await getToken({ req });
  if (token && token?.name === user?.user?.name) {
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
  }
  return NextResponse.json({ message: "not authorized" }, { status: 401 });
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get("id");
  const user = await getSession();

  if (token && token?.name === user?.user?.name) {
    try {
      const group = await prisma.group.findUnique({
        where: {
          id: groupId as string,
        },
      });

      if (group) {
        const users = group.userIds;

        for (const u of users) {
          const user = await prisma.user.findUnique({
            where: {
              id: u,
            },
          });

          if (user) {
            const updatedUserGroupIds = user.groupIds.filter(
              (id: string) => id !== groupId
            );

            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                groupIds: {
                  push: updatedUserGroupIds,
                },
              },
            });
          }
        }
        await prisma.group.delete({
          where: {
            id: groupId as string,
          },
        });
      }
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "not authorized" }, { status: 401 });
}
