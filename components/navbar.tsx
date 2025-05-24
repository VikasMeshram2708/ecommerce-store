import { LogOut, ShoppingBasket, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { dropDownLinks } from "@/data";

export default async function Navbar() {
  const { userId } = await auth();
  const user = (await currentUser()) || undefined;

  return (
    <nav className="bg-background p-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h2 className="flex items-center gap-1 text-base sm:text-lg font-semibold">
          <ShoppingBasket />
          <Link href={"/"}>Shop</Link>
        </h2>
        <div className="flex items-center gap-4">
          <ShoppingCart />
          {userId ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.imageUrl ??
                        `https://ui-avatars.com/api/?name=${
                          user?.fullName ?? "Anonymous"
                        }`
                      }
                      alt={user?.fullName ?? "User"}
                    />
                    <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {dropDownLinks.map((ctx) => (
                    <DropdownMenuItem key={ctx.name}>
                      <Link href={ctx.href}>{ctx.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <SignOutButton>
                <Button variant={"destructive"}>
                  <LogOut />
                  Logout
                </Button>
              </SignOutButton>
            </>
          ) : (
            <>
              <SignInButton>
                <Button variant={"outline"}>Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Sign Up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
