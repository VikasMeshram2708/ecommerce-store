import { Suspense } from "react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getCategories, getProducts } from "@/lib/getProducts";
import Image from "next/image";
import Header from "@/components/home/header";
import Link from "next/link";

type HomeProps = {
  searchParams: Promise<{
    category?: string; // pass category
  }>;
};
export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  console.log("category", category);
  const products = await getProducts(category);
  const categories = await getCategories();

  return (
    <main className="p-5 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header categories={categories} />
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Suspense
            fallback={<Skeleton className="h-[300px] w-full rounded-2xl" />}
          >
            {products?.map((product, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center p-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={512}
                    height={512}
                    className="w-32 h-32 object-contain mb-4"
                    priority
                  />
                  <CardTitle className="text-center hover:underline hover:underline-offset-4 line-clamp-2 mb-2 text-sm font-semibold">
                    <Link href={`/${product?.id}`}>{product.title}</Link>
                  </CardTitle>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <p className="font-bold text-sm mb-2">${product.price}</p>
                  <Button variant="default">Buy Now</Button>
                </CardFooter>
              </Card>
            ))}
          </Suspense>
        </ul>
      </div>
    </main>
  );
}
