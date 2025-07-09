import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!; // Assure-toi que c'est défini dans ton .env

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const resumes = await prisma.resumeCommande.findMany({
      where: {
        email: {
          contains: decoded.id, // ou `utilisateurId` si tu stockes ça
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Erreur récupération resume commandes :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
