import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Collections from "@/app/(dashboard)/collections/page";
const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("UnAuthorized userId", { status: 401 });
    }
    const deleteProduct = await prisma.products.delete({
      where: { id: params.productId },
    });

    return NextResponse.json("product deleted", { status: 200 });
  } catch (error) {
    console.log("Error deleting product:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest,{ params }: { params: { productId: string } }) {
console.log(params)
try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("UnAuthorized userId", { status: 401 });
    }
    const singleProduct = await prisma.products.findUnique({
      where: { id: params.productId },
    });
 
    return NextResponse.json(singleProduct,{status:200});
  } catch (error) {
    console.log("Error creating collection:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
  }

  export async function POST(req: NextRequest,{params}:{params:{productId:string}}) {
    console.log(params.productId)
    try {
      const { userId } = getAuth(req);
  
      if (!userId) {
        return new NextResponse("UnAuthorized userId", { status: 401 });
      }
      const data = await req.json();
      if(!data.title|| !data.description||!data.category||!data.price||!data.tags||!data.expense){
        return new NextResponse('missing required fields',{status:401});
    }   
    
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
      const updateProduct = await prisma.products.update({
        where: {
          id: params.productId,
        },
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
        collections: {
          connect: collectionsId.map((id:string) => ({ id })),
        },
    
        }
         
      })
        
      return NextResponse.json(updateProduct);
    } catch (error) {
      console.error("Error creating collection:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  } 