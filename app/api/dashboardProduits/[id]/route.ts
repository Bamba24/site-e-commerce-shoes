import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;

    const produit = await prisma.produit.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, produit });
  } catch (error) {
    console.error('Erreur suppression produit :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
