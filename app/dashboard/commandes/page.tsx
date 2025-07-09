'use client';

import React, { useEffect, useState } from 'react';
import type {Commande} from "../types/index";


export default function CommandeList() {
  const [commandes, setCommandes] = useState<Commande[]>([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await fetch('/api/dashboardCommandes');
        const data = await res.json();
        setCommandes(data || []);
        console.log(data)
      } catch (error) {
        console.error('Erreur lors du chargement des commandes :', error);
      }
    };

    fetchCommandes();
  }, []);

  return (
    <div className="w-full col-span-3 gap-4 p-6">
      <h2 className="text-2xl font-bold mb-6">Liste des Commandes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Produit</th>
              <th className="px-4 py-2">Quantité</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Lieu</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((cmd) => (
              <tr key={cmd.id} className="border-t text-sm">
                <td className="px-4 py-2">{cmd.id}</td>
                <td className="px-4 py-2">
                  {cmd.nomUtilisateur}
                  <div className="text-xs text-gray-500">{cmd.email}</div>
                </td>
                <td className="px-4 py-2">{cmd.produit}</td>
                <td className="px-4 py-2">{cmd.quantite}</td>
                <td className="px-4 py-2">{cmd.total} FCFA</td>
                <td className="px-4 py-2">{cmd.lieuLivraison}</td>
                <td className="px-4 py-2">{new Date(cmd.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
