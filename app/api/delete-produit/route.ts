import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    const produit = await prisma.produit.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, produit });
  } catch (error) {
    console.error('Erreur suppression produit :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
