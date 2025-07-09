'use client';

import React, { useEffect, useState } from 'react';
import type {Utilisateur} from "../types/index"

export default function UserList() {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appel API pour charger les utilisateurs
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/dashboardUtilisateurs');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className="w-full col-span-3 gap-4 p-6">
      <h2 className="text-2xl font-bold mb-6">Liste des Utilisateurs</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">Aucun utilisateur enregistré.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-sm font-semibold text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Rôle</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t text-sm">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.nom}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
