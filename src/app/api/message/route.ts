import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusherlib";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const { message, groupId } = await req.json();

  if (token) {
    try {
      const res = await prisma.message.create({
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
      await pusherServer.trigger("messages", "new-message", message);
      return NextResponse.json("Message sent", { status: 200 });
    } catch (e: any) {
      return new Response(e.message, { status: 500 });
    }
  }
}
