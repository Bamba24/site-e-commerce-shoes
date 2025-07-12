'use client';

import React, { useEffect, useState } from 'react';
import {Notification} from  "../types/index";


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

 useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const all = await res.json();

      // 🔒 Filtrer ici via le token localStorage
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      const filtered = all.filter((n: Notification) => n.userId === userId);
      setNotifications(filtered);

      // Marquer comme lues
      await fetch('/api/notifications/mark-read', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // facultatif si filtrage côté client
        },
      });
    } catch (error) {
      console.error('Erreur chargement des notifications :', error);
    }
  };

  fetchNotifications();
}, []);


  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded-lg border shadow-sm ${
                notif.isRead ? 'bg-gray-100' : 'bg-blue-100'
              }`}
            >
              <p className="text-sm">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                Reçue le {new Date(notif.createdAt).toLocaleString('fr-FR')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
