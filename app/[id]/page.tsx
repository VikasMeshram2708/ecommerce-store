import React from "react";
import Link from "next/link";
import { ArrowLeft, IndianRupee, Star } from "lucide-react";
import { getSingleProduct } from "@/lib/getProducts";
import Image from "next/image";
import QuantityBtn from "@/components/product/quantity-btn";
import AddToCartBtn from "@/components/product/add-to-cart-btn";
import { notFound } from "next/navigation";

type DetailedPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DetailedPage({ params }: DetailedPageProps) {
  const { id } = await params;
  const product = await getSingleProduct(id);
  console.log("product", product);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-sm text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>

        {/* Page Heading */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            {product?.title}
          </h1>
          <p className="text-sm text-gray-500 mt-1 capitalize">
            Category: {product?.category}
          </p>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div className="w-full aspect-square bg-gray-50 rounded-lg shadow-sm p-4 flex items-center justify-center">
            <Image
              width={512}
              height={512}
              src={product?.image}
              alt={product?.title}
              className="object-contain max-h-full max-w-full"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {product?.description}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold flex items-center  text-green-600">
                <IndianRupee className="w-4 h-4" />
                {product?.price}
              </span>
              <span className="text-sm text-gray-500">
                ({product?.rating.count} reviews)
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center text-yellow-500 gap-1">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-500" />
              <span className="text-sm font-medium">
                {product?.rating.rate}
              </span>
            </div>

            <AddToCartBtn />
            <QuantityBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
