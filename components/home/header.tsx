/**
 * Home page header component having heading and filter dropdown
 */
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "all";

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      router.push("/"); // remove category filter
    } else {
      router.push(`/?category=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="flex items-center justify-between pb-5">
      <h2 className="text-base sm:text-lg font-semibold">Latest Drops</h2>

      <Select
        onValueChange={handleCategoryChange}
        defaultValue={selectedCategory}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="capitalize">
            All
          </SelectItem>
          {categories?.map((category, idx) => (
            <SelectItem key={idx} value={category} className="capitalize">
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
