import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

  try {

    const { userId } = getAuth(req); 

    // if (!userId) {
    //   return new NextResponse("UnAuthorized userId", { status: 401 });
    // }
    const data = await req.json();
console.log(data)
    const {
      title,
      description,
      media,
      category,
      tags,
      sizes,
      colors,
      price,
      expense,
      collectionsId 
    } = data;

    if(!title|| !description||!category||!price||!tags||!expense){
        return new NextResponse('missing required fields',{status:401});
    }

     const newProducts = await prisma.products.create({
      
      data:{
        title,
      description,
      media,
      category,
      tags,
      sizes,
      colors,
      price,
      expense,
      collections:{
        create:collectionsId
      }
      }
    })

     console.log(newProducts)
     
     return NextResponse.json(newProducts);

  } catch (error) {
    console.error("Error creating product:", error);
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
