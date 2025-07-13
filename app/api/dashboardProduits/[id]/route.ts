// app/api/dashboardProduits/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Signature correcte
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const produit = await prisma.produit.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, produit });
  } catch (error) {
    console.error('Erreur suppression produit :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
