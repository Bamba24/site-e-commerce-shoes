'use client';

import { useState, useEffect, useRef } from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser, FiLogOut, FiBell } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import type {Produit} from "../types/index";

export default function HeaderAdmin() {

  const route = useRouter()

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [panierCount, setPanierCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const logOut = ()=>{
     localStorage.removeItem("token");
     window.location.reload();
     route.push('/')
  }

  const pageNotification = ()=>{
    window.location.reload();
    route.push('/notificatons');
  }
  const updatePanierCount = () => {
    const count = JSON.parse(localStorage.getItem('panier') || '[]');
    const totalCount = count.reduce((acc: number, item: Produit) => acc + item.quantity, 0);
    setPanierCount(totalCount);
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      const nonLues = data.filter((n: { isRead: boolean }) => !n.isRead);
      setNotificationCount(nonLues.length);
    } catch (error) {
      console.error('Erreur de récupération des notifications', error);
    }
  };

  useEffect(() => {
    updatePanierCount();
    fetchNotifications();

    const handlePanierUpdate = () => updatePanierCount();
    window.addEventListener('panierUpdated', handlePanierUpdate);
    return () => window.removeEventListener('panierUpdated', handlePanierUpdate);
  }, []);

  // Fermer dropdown si clique en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center py-6 px-[var(--padding-x-section)] bg-[var(--primary-color)] text-white sticky top-0 z-50">
      <div className="logo flex-1">
        <Image src="/icon-svg/logo.svg" alt="Logo" width={40} height={40} />
      </div>

      <nav>
        <ul className="flex flex-1 space-x-6 font-semibold hide-under-500">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produits">Produits</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <div className="flex flex-1 gap-x-4 items-center justify-end">
        {/* 🔔 Notification */}
        <Link onClick={pageNotification} href="/notifications" className="relative">
          <FiBell className="text-xl" />
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Link>

        {/* 🧍‍♂️ Dropdown utilisateur */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="hover:ring-2 p-1 rounded-full">
            <Image src="/icon-svg/profil.svg" alt="profil" width={20} height={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl py-2 z-50 text-sm">
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <MdDashboard /> Dashboard
              </Link>
              <Link href="/profil" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FiUser /> Profil
              </Link>
              <Link onClick={logOut}  href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FiLogOut /> Déconnexion
              </Link>
            </div>
          )}
        </div>

        {/* 🛒 Panier */}
        <Link href="/panier" className="relative">
          {panierCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {panierCount}
            </span>
          )}
          <Image src="/icon-svg/shop.svg" alt="panier" width={20} height={20} />
        </Link>

        {/* 🍔 Menu mobile */}
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Image src="/icon-svg/menuHamburger.svg" alt="menu" width={24} height={24} />
        </button>
      </div>

      {/* 📱 Menu mobile */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white text-black p-6 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="space-y-4 font-semibold">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produits">Produits</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </header>
  );
}
