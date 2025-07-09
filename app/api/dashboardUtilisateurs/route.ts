import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {

  const utilisateurs = await prisma.utilisateur.findMany();
  return NextResponse.json(utilisateurs );
   
}
