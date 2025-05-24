import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import DeleteItemBtn from "../product/delete-item-btn";

export default async function CartItems() {
  const { userId } = await auth();

  const totalItems = await prisma.cartItem.count({
    where: {
      userId: userId ?? "",
    },
  });

  const items = await prisma.cartItem.findMany({
    where: {
      userId: userId ?? "",
    },
  });

  const subtotal = items.reduce(
    (sum, i) => sum + (i.price ?? 0) * (i.quantity ?? 1),
    0
  );
  const tax = subtotal * 0.18;
  const shipping = 200;
  const total = subtotal + tax + shipping;

  return (
    <div className="space-y-4">
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            <span className="ml-2 text-sm">Loading cart...</span>
          </div>
        }
      >
        {userId && totalItems > 0 ? (
          <>
            <div className="flex items-center justify-between px-1">
              <h3 className="text-lg font-semibold">Cart</h3>
              <Badge variant="outline">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </Badge>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {items?.map((item) => {
                const itemTotal = (item.price ?? 0) * (item.quantity ?? 1);
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 items-start border-b pb-3"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image ?? "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-contain bg-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        {item.title}
                      </h4>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-muted-foreground">
                          {item.quantity ?? 1} × ₹
                          {item.price?.toLocaleString("en-IN")}
                        </p>
                        <p className="text-sm font-medium">
                          ₹{itemTotal.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Delete Item Btn */}
                    <DeleteItemBtn productId={item?.id ?? ""} />
                  </div>
                );
              })}
            </div>

            <Card className="border-0 shadow-none">
              <CardContent className="space-y-3 p-0">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (18%)</span>
                  <span>
                    ₹{tax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>₹200</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>
                    ₹
                    {total.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="sm">
              Proceed to Checkout
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center py-8 space-y-4 text-center">
            <ShoppingCart />
            <h4 className="font-medium">Your cart is empty</h4>
            <p className="text-sm text-muted-foreground px-4">
              Add some products to get started
            </p>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </Suspense>
    </div>
  );
}
