"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteItem } from "@/app/(server-actions)/products";

export default function DeleteItemBtn(props: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const { productId: id } = props;
  async function handleDelete() {
    setLoading(true);
    try {
      const result = await deleteItem({ id });
      if (!result.success) {
        if (result?.schemaError) {
          console.log("e", result?.schemaError);
          alert(result?.message ?? "Failed");
        }
        return;
      }
      alert("Deleted");
    } catch (e) {
      console.error(e);
      alert((e as Error).message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button
      onClick={handleDelete}
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-destructive hover:text-destructive/90"
      aria-label="Remove from cart"
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
