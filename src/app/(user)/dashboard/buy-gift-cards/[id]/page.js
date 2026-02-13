"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useGetGiftcardProductById } from "../../../../../hooks/buyGiftcardHooks";

export default function BuyGiftCardPage({ params }) {
  const { id } = params;

  const { product, loading, error } = useGetGiftcardProductById(id);

  if (loading) {
    return (
      <div className="p-6 max-w-md">
        <p className="text-slate-600">Loading gift card...</p>
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  return (
    <div className="p-6 max-w-md">
      <h1 className="mb-4 text-xl font-semibold text-slate-900">
        {product.productName}
      </h1>

      <Image
        src={product.logoUrl || product.logo_url}
        alt={product.productName}
        width={300}
        height={200}
        className="mb-4 rounded-md object-cover"
      />

      <p className="mb-6 text-sm text-slate-600">
        Buy this gift card securely and instantly.
      </p>

      <button className="rounded-md bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">
        Buy Gift Card
      </button>
    </div>
  );
}
