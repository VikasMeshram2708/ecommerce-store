"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@/app/context/store";

export default function QuantityBtn() {
  const { increaseQuantity, decreaseQuantity, totalProducts } = useStore();
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => decreaseQuantity()} disabled={totalProducts === 0}>
        <Minus />
      </Button>
      <p>{totalProducts}</p>
      <Button onClick={() => increaseQuantity()}>
        <Plus />
      </Button>
    </div>
  );
}
