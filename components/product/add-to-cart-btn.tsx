"use client";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";

export default function AddToCartBtn() {
  const { userId } = useAuth();
  function handleCart() {
    try {
      if (!userId) {
        alert("Login Required");
      }
      alert("ok");
    } catch (e) {
      console.error(e);
      alert((e as Error).message ?? "Something went wrong. Please try again.");
    }
  }
  return (
    <Button onClick={handleCart} size={"lg"}>
      Add to Cart
    </Button>
  );
}
