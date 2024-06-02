 
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

export async function DELETE(req: NextRequest,{params}:{params:{collectionId:string}}) {
    
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("UnAuthorized userId", { status: 401 });
    }
    const deletedCollection = await prisma.collections.delete({
      where: { id: params.collectionId },
    });

    return NextResponse.json('collection deleted',{status:200});
  } catch (error) {
    console.log("Error creating collection:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest,{params}:{params:{collectionId:string}}){
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("UnAuthorized userId", { status: 401 });
    }
    const deletedCollection = await prisma.collections.findUnique({
      where: { id: params.collectionId },
    });
 
    return NextResponse.json(deletedCollection,{status:200});
  } catch (error) {
    console.log("Error creating collection:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest,{params}:{params:{collectionId:string}}) {
  console.log(params.collectionId)
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("UnAuthorized userId", { status: 401 });
    }
    const data = await req.json();
    
  
    const updateUser = await prisma.collections.update({
      where: {
        id: params.collectionId,
      },
      data,
    })
      
    return NextResponse.json(updateUser);
  } catch (error) {
    console.error("Error creating collection:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 