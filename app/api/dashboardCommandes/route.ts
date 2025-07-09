import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {

  const commandes = await prisma.resumeCommande.findMany();
  return NextResponse.json(commandes);
   
}
