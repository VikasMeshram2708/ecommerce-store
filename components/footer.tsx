import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <Card className="border-0 shadow-none rounded-none">
        <CardContent className="max-w-7xl mx-auto py-6 px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBasket className="h-5 w-5" />
            <Link href="/" className="hover:underline">
              Shop
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Contact us</p>
            <p>
              Email:{" "}
              <a href="mailto:support@xyz.com" className="hover:underline">
                support@xyz.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="max-w-7xl mx-auto text-center py-4 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} All Rights Reserved.
      </div>
    </footer>
  );
}
