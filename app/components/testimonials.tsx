import React from 'react';
import Image from 'next/image';
import '../globals.css';

export default function PopularProducts() {
  return (
    <div className="px-4 py-10">
      {/* Titre + bouton */}
      <div className="mb-[var(--margin-bottom-title)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="lg:w-[50%] w-full">
          <p className="[font-size:var(--police-secondary)] font-[var(--font-titre)]">
            Latest Ongoings
          </p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat. Nunc auctor consectetur elit, quis pulvina.
          </p>
        </div>

        <button className="[font-size:var(--police-button)] bg-[var(--background-button)] py-2 px-4 text-white font-semibold rounded-full hover:bg-gray-800 flex items-center gap-x-2 transition-all">
          Read All Blogs
          <Image src="/icon-svg/chevron-droite.svg" alt="Logo" width={20} height={20} />
        </button>
      </div>

      {/* Grille des blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col justify-center gap-y-2">
            <div className="bg-slate-500 rounded-xl overflow-hidden">
              <Image
                src="/icon-svg/sofa.svg"
                alt="Sofa"
                width={396}
                height={275}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="[font-size:var(--police-title-card-primary)]">
              Lorem Ipsum Is a Dummy Text Used As The Heading Of a Blog
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
