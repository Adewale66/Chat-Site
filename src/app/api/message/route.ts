import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();
  const { message, groupId } = body;
  if (token) {
    try {
      await prisma.message.create({
        data: {
          message: message,
          userId: token.id as string,
          groupId: groupId,
        },
      });
      return new Response("Message sent", { status: 200 });
    } catch (e: any) {
      console.log("server error");
      return new Response(e.message, { status: 500 });
    }
  }
}
