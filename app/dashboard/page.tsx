'use client';

import React, { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

export default function Stats() {
  const [stats, setStats] = useState([
    {
    totalProduits: 0,
    totalCommandes: 0,
    totalUtilisateurs: 0,
    revenusTotaux: 0,
    dernierClient: '',
    produitTopVente: '',
    derniereCommandeDate: '',
    revenusParJour: 0,
  }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/statistiques');
        const data = await res.json();
        setStats(data);
        console.log(data)
      } catch (error) {
        console.error('Erreur chargement stats :', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full col-span-3 gap-4 p-6">
      <h2 className="text-2xl font-bold mb-6">Statistiques Globales</h2>

      {/* Bloc 1 : Chiffres clés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white border shadow rounded-xl p-5">
          <p className="text-gray-600 text-sm mb-2">Produits</p>
          <h3 className="text-3xl font-bold text-blue-600">{stats[0].totalProduits}</h3>
        </div>

        <div className="bg-white border shadow rounded-xl p-5">
          <p className="text-gray-600 text-sm mb-2">Commandes</p>
          <h3 className="text-3xl font-bold text-green-600">{stats[0].totalCommandes}</h3>
        </div>

        <div className="bg-white border shadow rounded-xl p-5">
          <p className="text-gray-600 text-sm mb-2">Utilisateurs</p>
          <h3 className="text-3xl font-bold text-purple-600">{stats[0].totalUtilisateurs}</h3>
        </div>

        <div className="bg-white border shadow rounded-xl p-5">
          <p className="text-gray-600 text-sm mb-2">Revenus (fcfa)</p>
          <h3 className="text-3xl font-bold text-red-600">
            {stats[0].totalRevenus} 
          </h3>
        </div>
      </div>

      {/* Bloc 3 : Graphique
      <div className="bg-white border shadow rounded-xl p-5">
        <p className="text-gray-600 text-sm mb-4">Revenus par jour</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.revenusParJour}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenu" fill="#fb2c36" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}
