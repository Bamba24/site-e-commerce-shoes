'use client';

import React, { useState, useEffect } from 'react';
import type { Produit } from '../types/index';
import Link from 'next/link';

export default function ProductListing() {
  const [allProducts, setAllProducts] = useState<Produit[]>([]);
  const [state, setState] = useState<Produit[]>([]);
  const [input, setInput] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCategoryShoes, setSelectedCategoryShoes] = useState('');
  const [selectedPointure, setSelectedPointure] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const categories = ['All', 'Hommes', 'Femmes', 'Enfants'];
  const categoriesShoes = ['Running', 'Basketball', 'Training', 'Football'];
  const prices = [
    '5000 - 10000',
    '10000 - 15000',
    '15000 - 20000',
    '20000 - 25000',
  ];
  const shoesPointures = [36, 37, 38, 39, 40, 41, 42, 43, 44];
  const colors = ['Noir', 'Blanc', 'Bleu', 'Rouge', 'Vert', 'Gris', 'Violet', 'Rose'];

  // Chargement des produits depuis l'API
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await fetch('/api/allProduits');
        const data = await res.json();
        setAllProducts(data);
        setState(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };
    fetchProduits();
  }, []);

  // Filtres
  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) =>
        p.genre.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedCategoryShoes) {
      filtered = filtered.filter((p) =>
        p.categorie.toLowerCase() === selectedCategoryShoes.toLowerCase()
      );
    }

    if (selectedPointure !== null) {
      filtered = filtered.filter((p) => {
        const sizes = typeof p.pointuresDisponibles === 'string'
          ? p.pointuresDisponibles.split(',').map(Number)
          : p.pointuresDisponibles;
        return sizes.includes(selectedPointure);
      });
    }

    if (selectedColor) {
      filtered = filtered.filter((p) => {
        const couleurs = typeof p.couleursDisponibles === 'string'
          ? p.couleursDisponibles.split(',').map(c => c.trim().toLowerCase())
          : p.couleursDisponibles.map((c: string) => c.toLowerCase());
        return couleurs.includes(selectedColor.toLowerCase());
      });
    }

    if (selectedPrice) {
      const [minStr, maxStr] = selectedPrice.replace(/\$/g, '').split(/\s*-\s*/);
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      filtered = filtered.filter((p) => p.prix >= min && p.prix <= max);
    }

    if (input) {
      filtered = filtered.filter((p) =>
        p.nom.toLowerCase().includes(input.toLowerCase())
      );
    }

    setState(filtered);
  }, [
    selectedCategory,
    selectedCategoryShoes,
    selectedPointure,
    selectedColor,
    selectedPrice,
    input,
    allProducts,
  ]);

  return (
    <div>
      {/* Titre + Search */}
      <div className="px-8 py-6 text-center">
        <h2 className="[font-size:var(--police-secondary)] font-[var(--font-titre)] mb-2">
          Our Collection Of Products
        </h2>
        <div className="flex items-center mx-auto gap-2 mb-4 border rounded-full px-4 py-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search An Item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none w-full"
          />
        </div>
        <p className="text-sm text-gray-600">
          Showing {state.length} item(s)
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 px-8 pb-8">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 sticky top-20 h-fit border p-4 space-y-8">

          {/* Genre */}
          <div>
            <h3 className="text-lg font-bold mb-4">| Categories</h3>
            <ul className="grid grid-cols-2 gap-4">
              {categories.map((category, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Type */}
          <div>
            <h3 className="text-lg font-bold mb-4">| Shoes Type</h3>
            <ul className="grid grid-cols-2 gap-4">
              {categoriesShoes.map((category, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shoesCategory"
                      checked={selectedCategoryShoes === category}
                      onChange={() => setSelectedCategoryShoes(category)}
                    />
                    <span>{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Pointures */}
          <div>
            <h3 className="text-lg font-bold mb-4">| Shoes Sizes</h3>
            <ul className="grid grid-cols-3 gap-4">
              {shoesPointures.map((pointure, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pointure"
                      checked={selectedPointure === pointure}
                      onChange={() => setSelectedPointure(pointure)}
                    />
                    <span>{pointure}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Couleurs */}
          <div>
            <h3 className="text-lg font-bold mb-4">| Colors</h3>
            <ul className="grid grid-cols-2 gap-4">
              {colors.map((color, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                    />
                    <span>{color}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Prix */}
          <div>
            <h3 className="text-lg font-bold mb-4">| Price Range</h3>
            <ul className="space-y-2">
              {prices.map((price, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice === price}
                      onChange={() => setSelectedPrice(price)}
                    />
                    <span>{price}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 col-span-12 md:col-span-9">
          {state.length > 0 ? (
            state.map((product, idx) => {
              const imagesArray = product.images?.split(',') || [];
              return (
                <Link
                  href={`/produits/${product.slug}`}
                  key={idx}
                  className="w-full sm:w-[48%] lg:w-[31%] h-80 rounded-xl bg-cover bg-center bg-no-repeat flex flex-col justify-end p-4 relative text-slate-900 shadow-md"
                  style={{
                    backgroundImage: imagesArray.length > 0
                      ? `url('/${imagesArray[0]}')`
                      : 'none',
                  }}
                >
                  <div>
                    {product.remise > 0 && (
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                        -{product.remise}%
                      </div>
                    )}
                    <p className="[font-size:var(--police-title-card-primary)] truncate">{product.nom}</p>
                    <p className="[font-size:var(--police-title-card-secondary)]">
                      {product.ancienPrix && (
                        <span className="line-through text-slate-900 mr-2">
                          {product.ancienPrix} fcfa
                        </span>
                      )}
                      {product.prix} fcfa
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center text-gray-500 w-full">Aucun produit trouvé</p>
          )}
        </div>

      </div>
    </div>
  );
}
