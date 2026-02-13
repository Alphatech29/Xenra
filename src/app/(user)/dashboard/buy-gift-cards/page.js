"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

import { useGetAllGiftcardProducts } 
  from "../../../../hooks/buyGiftcardHooks";
import { useGetAllCountries } 
  from "../../../../hooks/countriesHooks";

import Pagination from "../../../../lib/pagination";

/* =========================
   Country Dropdown
========================= */
function CountryDropdown({ countries, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedCountry = countries.find(
    (c) => c.iso_code === value
  );

  const filteredCountries = useMemo(() => {
    return countries.filter((c) =>
      c.country_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [countries, search]);

  return (
    <div className="relative w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-secondary-700">
        Select Country
      </label>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-secondary-300 bg-secondary-50 px-3 py-2 text-sm shadow-sm"
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedCountry.flag_url}
              alt={selectedCountry.country_name}
              className="h-5 w-5 rounded-sm"
            />
            <span className="truncate">
              {selectedCountry.country_name}
            </span>
          </div>
        ) : (
          <span className="text-slate-400">All Countries</span>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-primary-400 text-secondary-700 bg-white shadow-lg">
          <div className="p-2">
            <input
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-primary-400 px-2 py-1 text-sm text-secondary-700"
            />
          </div>

          <div className="max-h-56 overflow-auto text-secondary-700">
            <button
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-secondary-100"
            >
              All Countries
            </button>

            {filteredCountries.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onChange(c.iso_code);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-secondary-100"
              >
                <img src={c.flag_url} className="h-5 w-5 rounded-sm" />
                {c.country_name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   Brand Dropdown
========================= */
function BrandDropdown({ brands, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredBrands = useMemo(() => {
    return brands.filter((b) =>
      b.brand_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [brands, search]);

  const selectedBrand = brands.find(
    (b) => b.brand_name === value
  );

  return (
    <div className="relative w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-secondary-700">
        Select Brand
      </label>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-secondary-300 bg-secondary-50 px-3 py-2 text-sm shadow-sm"
      >
        {selectedBrand ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedBrand.brand_logo_url}
              className="h-5 w-5 rounded-sm"
            />
            <span className="truncate">
              {selectedBrand.brand_name}
            </span>
          </div>
        ) : (
          <span className="text-slate-400">All Brands</span>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full text-secondary-700 rounded-md border bg-white shadow-lg">
          <div className="p-2">
            <input
              placeholder="Search brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border px-2 py-1 text-sm"
            />
          </div>

          <div className="max-h-56 overflow-auto text-secondary-700">
            <button
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-secondary-700 text-sm hover:bg-secondary-100"
            >
              All Brands
            </button>

            {filteredBrands.map((b) => (
              <button
                key={b.brand_name}
                onClick={() => {
                  onChange(b.brand_name);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-secondary-100"
              >
                <img
                  src={b.brand_logo_url}
                  className="h-5 w-5 rounded-sm"
                />
                {b.brand_name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   Main Page
========================= */
export default function BuyGiftCard() {
  const { products = [] } = useGetAllGiftcardProducts();
  const { countries = [] } = useGetAllCountries();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry, selectedBrand, search]);

  const brands = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.brand_name && !map.has(p.brand_name)) {
        map.set(p.brand_name, {
          brand_name: p.brand_name,
          brand_logo_url: p.brand_logo_url,
        });
      }
    });
    return Array.from(map.values());
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCountry =
        !selectedCountry ||
        p.country_iso === selectedCountry ||
        p.country_code === selectedCountry;

      const matchBrand =
        !selectedBrand || p.brand_name === selectedBrand;

      const matchSearch =
        !search ||
        p.product_name.toLowerCase().includes(search.toLowerCase());

      return matchCountry && matchBrand && matchSearch;
    });
  }, [products, selectedCountry, selectedBrand, search]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen p-4 space-y-6 mb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <CountryDropdown
          countries={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
        />

        <BrandDropdown
          brands={brands}
          value={selectedBrand}
          onChange={setSelectedBrand}
        />

        <div className="w-full max-w-xs">
          <label className="mb-1 block text-sm font-medium text-secondary-700">
            Search Gift Card
          </label>
          <input
            value={search}
            placeholder="Search giftcard"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-secondary-600 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {paginatedProducts.map((card) => (
          <Link
            key={card.product_id}
            href={`/dashboard/buy-gift-card/${card.product_id}`}
            className="flex flex-col items-center rounded-md bg-white p-2 shadow-sm hover:shadow-lg"
          >
            <img src={card.logo_url} className="h-28 w-40 rounded-md" />
            <h3 className="text-sm font-medium text-center text-secondary-600">
              {card.product_name}
            </h3>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
