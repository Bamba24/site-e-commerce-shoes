import React from 'react';
import Image from 'next/image';
import '../globals.css';

export default function Faq() {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 px-4 py-10">
      {/* Colonne gauche */}
      <div className="lg:w-1/2 w-full">
        <p className="[font-size:var(--police-secondary)] font-[var(--font-titre)]">
          Frequently Asked Questions
        </p>
        <p className="[font-size:var(--police-tertiary)] mb-[var(--margin-bottom-title)]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <button className="[font-size:var(--police-button)] bg-black py-2 px-4 text-white font-semibold rounded-full hover:bg-gray-800 flex items-center gap-x-2 transition-all">
          Ask a Question
          <Image src="/icon-svg/chevron-droite.svg" alt="Logo" width={20} height={20} />
        </button>
      </div>

      {/* Colonne droite */}
      <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[90, 100, 98, 97].map((percent, index) => (
            <div key={index}>
              <p className="[font-size:var(--police-secondary)] font-bold">{percent}%</p>
              <p className="[font-size:var(--police-tertiary)]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
