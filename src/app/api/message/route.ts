import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();
  const { message, groupId } = body;

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
      return NextResponse.json("Message sent", { status: 200 });
    } catch (e: any) {
      console.log("server error");
      return new Response(e.message, { status: 500 });
    }
  }
}
