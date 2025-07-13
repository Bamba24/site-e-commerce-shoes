

import React from 'react';
import Image from 'next/image';
import '../globals.css';

export default function Proportion() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 px-4 py-10">
      {/* Colonne gauche */}
      <div className="flex-1">
        <p className="[font-size:var(--police-secondary)] mb-[var(--margin-bottom-title)] font-[var(--font-titre)]">
          Have a Look at Our Unique Selling Proportions
        </p>
        <button className="[font-size:var(--police-button)] bg-[var(--background-button)] py-2 px-4 text-white font-semibold rounded-full hover:bg-gray-800 flex items-center gap-x-2 transition-all">
          Read More
          <Image src="/icon-svg/chevron-droite.svg" alt="Logo" width={20} height={20} />
        </button>
      </div>

      {/* Colonne droite */}
      <div className="flex-1 flex flex-col gap-y-6">
        <p className="[font-size:var(--police-tertiary)] opacity-70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <p className="[font-size:var(--police-secondary)] font-bold">90%</p>
            <p className="[font-size:var(--police-tertiary)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>
          <div className="flex-1">
            <p className="[font-size:var(--police-secondary)] font-bold">100%</p>
            <p className="[font-size:var(--police-tertiary)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
