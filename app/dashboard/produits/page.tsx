'use client';

import React, { useEffect, useState } from 'react';
import type {Produit} from "../types/index"
import Image from 'next/image';


export default function ProductList() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await fetch('/api/dashboardProduits');
        const data = await res.json();
        setProduits(data || []);
      } catch (error) {
        console.error('Erreur chargement produits :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);


  const handleDelete = async (id: string) => {
  const confirm = window.confirm('Confirmer la suppression de ce produit ?');
  if (!confirm) return;

  try {
    const res = await fetch(`/api/dashboardProduits/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Erreur de suppression');

    // Mise à jour du state local
    setProduits((prev) => prev.filter((p) => p.id !== id));
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
  }
};


  return (
    <div className=" w-full col-span-3 gap-4 p-6">
      <h2 className="text-2xl font-bold mb-6">Liste des Produits</h2>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : produits.length === 0 ? (
        <p className="text-gray-500">Aucun produit disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
              <Image
                  src={`/${product.images.split(',')[0]}`}
                  alt={product.nom}
                  width={300}
                  height={300}
                  className="object-cover w-full h-60"
                />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold truncate">{product.nom}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong>Prix:</strong>{' '}
                    <span className="text-black font-medium">{product.prix} €</span>{' '}
                    {product.ancienPrix && (
                      <span className="line-through text-gray-400 ml-2">{product.ancienPrix} €</span>
                    )}
                  </p>
                  {product.remise && (
                    <p className="text-green-600">Remise: -{product.remise}%</p>
                  )}
                  <p><strong>Catégorie:</strong> {product.categorie}</p>
                  <p><strong>Genre:</strong> {product.genre}</p>
                  <p><strong>Pointures:</strong>{' '} </p>

                  <p>
                    {Array.isArray(product.pointuresDisponibles)
                      ? product.pointuresDisponibles.join(', ')
                      : typeof product.pointuresDisponibles === 'string'
                      ? product.pointuresDisponibles.split(',').join(', ')
                      : '—'}
                  </p>

                    <p><strong>Couleurs:</strong>{' '}
                      {Array.isArray(product.couleursDisponibles)
                        ? product.couleursDisponibles.join(', ')
                        : typeof product.couleursDisponibles === 'string'
                        ? product.couleursDisponibles.split(',').join(', ')
                        : '—'}
                    </p>
                  <p>
                    <strong>Stock:</strong>{' '}
                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock > 0 ? `${product.stock} dispo` : 'Rupture'}
                    </span>
                  </p>
                  <p><strong>Note:</strong> {product.note} ⭐ ({product.nombreAvis} avis)</p>
                </div>

                {/* Boutons d'action (logique à implémenter plus tard) */}
               <button
                   onClick={() => handleDelete(product.id)}
                   className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                  Supprimer
               </button>

                {/* <button className="mt-4 bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
                  Modifier
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
