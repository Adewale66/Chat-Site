import { getSession } from "@/actions/getCurrentUser";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const user = await getSession();
  const { groupId } = await req.json();
  if (token && token.email === user?.user?.email) {
    try {
      const findUser = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      const group = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
      });

      if (findUser && group) {
        const removeGroupId = findUser.groupIds.filter(
          (groupid) => groupid !== groupId
        );
        const filteredGroups = group.userIds.filter((userId) => userId !== id);
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            groupIds: removeGroupId,
          },
        });
        await prisma.group.update({
          where: {
            id: groupId,
          },
          data: {
            userIds: filteredGroups,
          },
        });
        return NextResponse.json(
          { message: "User removed from group" },
          { status: 200 }
        );
      }
    } catch (error) {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  }
  return NextResponse.json(
    { message: "You are not authorized to perform this action" },
    { status: 401 }
  );
}
