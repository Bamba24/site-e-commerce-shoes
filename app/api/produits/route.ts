import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newProduct = await prisma.produit.create({
      data: {
        nom: body.nom,
        slug: body.slug,
        description: body.description,
        prix: body.prix,
        ancienPrix: body.ancienPrix,
        remise: body.remise,
        genre: body.genre,
        categorie: body.categorie,
        marque: body.marque,
        pointuresDisponibles: body.pointuresDisponibles, // CSV
        couleursDisponibles: body.couleursDisponibles,   // CSV
        images: body.images,                             // CSV
        stock: body.stock,
        note: body.note,
        nombreAvis: body.nombreAvis,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Erreur ajout produit:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
