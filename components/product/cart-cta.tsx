"use client";

import { Button } from "../ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Product } from "@/types";
import { addToCart } from "@/app/(server-actions)/products";
import { useState } from "react";

export default function CartCta({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function handleQuantity(actionType: "INC" | "DEC") {
    if (actionType === "INC") {
      setQuantity((prev) => prev + 1);
    } else if (actionType === "DEC") {
      setQuantity(Math.max(1, quantity - 1));
    }
  }
  const { userId } = useAuth();
  async function handleCart() {
    setLoading(true);
    try {
      if (!userId) {
        alert("Login Required");
        return;
      }
      const config = {
        ...product,
        skuId: `SKU-${product?.id}`,
        quantity: quantity,
      };

      //   console.log("g", config);
      const result = await addToCart(config);
      if (!result.success) {
        alert(result.message ?? "Failed");
        return;
      }
      alert("Added to cart");
    } catch (e) {
      console.error(e);
      alert((e as Error).message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2">
        <Button onClick={() => handleQuantity("DEC")} disabled={quantity === 0}>
          <Minus />
        </Button>
        <p>{quantity}</p>
        <Button onClick={() => handleQuantity("INC")}>
          <Plus />
        </Button>
      </div>
      <div className="grid gap-2">
        <Button onClick={handleCart} size={"lg"}>
          {loading ? <Loader2 className="animate-spin" /> : "Add to Cart"}
        </Button>
        <Button size="lg" variant="secondary">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
