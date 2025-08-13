import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  category?: string;
  featured?: boolean;
  searchQuery?: string;
  title?: string;
  subtitle?: string;
}

export function ProductGrid({ category, featured, searchQuery, title, subtitle }: ProductGridProps) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { category, featured, search: searchQuery }],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-accent text-lg">No products found.</p>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search terms or browse our categories.
          </p>
        )}
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="font-poppins font-bold text-4xl mb-4">{title}</h2>}
            {subtitle && <p className="text-xl text-accent">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
