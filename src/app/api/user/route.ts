import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, email, name } = body;

  let user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id,
        email,
        name,
      },
    });
  }

  return NextResponse.json(user);
}
