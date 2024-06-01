import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("UnAuthorized userId", { status: 401 });
    }
    const data = await req.json();
    
    const { title } = data;
    const collection = await prisma.collections.findFirst({
      where: {
        title,
      },
    });
    if (collection) {
      return new NextResponse(
        "Collection already exist please enter unique title",
        { status: 400 }
      );
    }
 
    const newCollection = await prisma.collections.create({data });
    return NextResponse.json(newCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest) {
  const allCollections = await prisma.collections.findMany();
  if (allCollections.length === 0) {
    return new NextResponse("There is no collection in the database", {
      status: 404,
    });
  }
  return NextResponse.json(allCollections, { status: 200 });
}
