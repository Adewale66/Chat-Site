import { NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  console.log(token);
  if (token) res.status(200).json({ token });
  return res.status(401).json({ message: "Unauthorized" });
}
