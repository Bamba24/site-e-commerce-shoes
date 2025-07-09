"use client";

import { useState, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../globals.css';

export default function Headers() {

  const updatePanierCount = ()=>{
    const count = JSON.parse(localStorage.getItem("panier") || '[]');
    const totalCount = count.reduce((acc, item) => acc + item.quantity, 0);
    setPanierCount(totalCount)
  }

  useEffect(()=>{

    updatePanierCount()

    const handlePanierUpdate = ()=> updatePanierCount();
    
    window.addEventListener('panierUpdated', handlePanierUpdate);

    return () => {
      window.removeEventListener('panierUpdated', handlePanierUpdate);
    };

  }, [])

  const [isOpen, setIsOpen] = useState<string | boolean>(false);
  const [panierCount, setPanierCount] = useState<number>(0)

  const openMenuHamburger = ()=>{
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <header className='flex justify-between items-center py-6 text-black-500 sticky top-0 z-50 px-[var(--padding-x-section)] bg-[var(--primary-color)]'>
      <div className="logo flex-1 justify-left">
        <Image src="/icon-svg/logo.svg" alt="Logo" width={40} height={40} />
      </div>
      <nav>
        <ul className='flex space-x-6 text-white font-semibold hide-under-500 flex-1 justify-center'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produits">Products</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="flex gap-x-4 flex-1 justify-end items-center">       
        <button>
          <Link href="/login" className='text-white'>
            Connexion
          </Link>
        </button>
        <button>
          <Link href="/register" className='text-white'>
            S'enregistrer
          </Link>
        </button>
        {/* <button>
          <Image src="/icon-svg/profil.svg" alt="profil logo " width={20} height={20} />
        </button> */}
        <button>
         <Link href="/panier">
          {panierCount ? (<span className='w-4 bg-red-500 rounded-full absolute top-5 right-2 text-white text-center font-medium text-ellipsis text-sm'>{panierCount}</span>):(
            <span></span>
           )}
           <Image src="/icon-svg/shop.svg" alt="shop logo" width={20} height={20} />
         </Link>
        </button>
        <button className='sm:hidden' onClick={openMenuHamburger}>
          <Image src="/icon-svg/menuHamburger.svg" alt="menu hamburger" width={24} height={24} />
        </button>
      </div>
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <ul className="space-y-4">
          <li><Link href="#" className="text-lg font-semibold">Accueil</Link></li>
          <li><Link href="#" className="text-lg font-semibold">Produits</Link></li>
          <li><Link href="#" className="text-lg font-semibold">Contact</Link></li>
        </ul>
      </div>
    </header>
  )
}
