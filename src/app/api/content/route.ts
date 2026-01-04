import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }
  const contents = await prisma.content.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contents);
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }
  const body = await request.json();
  const content = await prisma.content.create({
    data: {
      title: body.title,
      description: body.description,
      type: body.type,
      status: body.status || "draft",
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
      userId,
    },
  });
  return NextResponse.json(content);
}
