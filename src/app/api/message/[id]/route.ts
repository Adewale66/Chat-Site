import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusherlib";
import { getSession } from "@/actions/getCurrentUser";

export async function GET(req: NextRequest) {
  const groupId = req.url.slice(req.url.lastIndexOf("/") + 1);
  const token = await getToken({ req });
  const user = await getSession();

  if (token && token.email === user?.user?.email) {
    try {
      const messages = await prisma.message.findMany({
        include: {
          user: true,
        },
        where: {
          groupId: groupId,
        },
      });

      if (messages) return NextResponse.json(messages, { status: 200 });
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    } catch (error) {
      console.log(error);

      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  }
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const { message } = await req.json();
  const groupId = req.url.slice(req.url.lastIndexOf("/") + 1);

  if (token) {
    try {
      const res = await prisma.message.create({
        include: {
          user: true,
        },
        data: {
          message: message,
          userId: token.id as string,
          groupId: groupId,
        },
      });

      await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          messagesId: {
            push: res.id,
          },
        },
      });
      await pusherServer.trigger(groupId, "new-message", res);
      return NextResponse.json("Message sent", { status: 200 });
    } catch (e: any) {
      return new Response(e.message, { status: 500 });
    }
  }
  return NextResponse.json("Unauthorized", { status: 401 });
}
