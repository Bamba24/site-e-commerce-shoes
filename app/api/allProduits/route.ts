import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {

  const produits = await prisma.produit.findMany();
  return NextResponse.json(produits);
   
}
