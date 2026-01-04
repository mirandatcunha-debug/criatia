import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  
  if (!userId) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  const totalContents = await prisma.content.count({
    where: { userId },
  });

  const draftContents = await prisma.content.count({
    where: { userId, status: "draft" },
  });

  const scheduledContents = await prisma.content.count({
    where: { userId, status: "scheduled" },
  });

  const publishedContents = await prisma.content.count({
    where: { userId, status: "published" },
  });

  const recentContents = await prisma.content.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return NextResponse.json({
    totalContents,
    draftContents,
    scheduledContents,
    publishedContents,
    recentContents,
  });
}
