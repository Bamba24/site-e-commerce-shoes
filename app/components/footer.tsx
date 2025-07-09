import React from 'react';
import Image from 'next/image';
import '../globals.css';

export default function Footer() {
  return (
    <div className="text-center flex flex-col gap-y-10 items-center bg-[var(--primary-color)] py-[var(--padding-section)] px-4">
      {/* Logo */}
      <Image src="/icon-svg/logo.svg" alt="Logo" width={100} height={100} />

      {/* Titre */}
      <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-[var(--font-titre)] leading-relaxed">
        Subscribe To Your Newsletter to <br />
        Updated About Discounts
      </p>

      {/* Formulaire d'abonnement */}
      <div className="bg-[var(--background-button-search)] py-3 px-4 rounded-full flex items-center justify-between w-full max-w-xl ring-2 ring-white">
        <input
          className="placeholder:text-white text-white bg-transparent focus:outline-none w-full mr-4"
          type="text"
          placeholder="exemple@gmail.com"
        />
        <button className="bg-black rounded-full p-3 hover:bg-gray-950">
          <Image src="/icon-svg/chevron-droite.svg" alt="chevron droite" width={20} height={20} />
        </button>
      </div>

      {/* Liens (menu pied de page) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-center  text-white mt-[var(--margin-bottom-title)] text-left">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i}>
              <h3 className="[font-size:var(--police-tertiary)] mb-2">Legal Pages</h3>
              <p className="[font-size:var(--police-tertiary)] opacity-70">product 1</p>
              <p className="[font-size:var(--police-tertiary)] opacity-70">product 1</p>
              <p className="[font-size:var(--police-tertiary)] opacity-70">product 1</p>
            </div>
          ))}
      </div>
    </div>
  );
}
