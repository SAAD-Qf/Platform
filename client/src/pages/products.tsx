import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/products/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import type { Product } from "@shared/schema";

const categories = {
  "all": "All Products",
  "leather-jackets": "Leather Jackets",
  "hoodies": "Hoodies", 
  "pants": "Pants",
  "womens-wear": "Women's Wear",
  "mens-wear": "Men's Wear",
  "featured": "Featured Products"
};

export default function Products() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = location.split('/').pop() || 'all';
  const searchFromUrl = urlParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [sortBy, setSortBy] = useState("newest");
  const [currentCategory, setCurrentCategory] = useState(categoryFromUrl);

  // Update search when URL changes
  useEffect(() => {
    setSearchQuery(searchFromUrl);
    setCurrentCategory(categoryFromUrl);
  }, [location, searchFromUrl, categoryFromUrl]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    staleTime: 0, // Always refetch to ensure fresh data
    gcTime: 0, // Don't cache results
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/products/all?search=${encodeURIComponent(searchQuery)}`);
    } else {
      window.history.pushState({}, '', `/products/${currentCategory}`);
    }
  };

  // Filter and sort products
  const filteredProducts = products ? products.filter(product => {
    // Category filter
    if (currentCategory !== 'all' && currentCategory !== 'featured') {
      if (product.category !== currentCategory) return false;
    }
    if (currentCategory === 'featured' && !product.featured) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) || 
             product.description.toLowerCase().includes(query) ||
             product.category.toLowerCase().includes(query);
    }
    
    return true;
  }) : [];

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const categoryTitle = categories[currentCategory] || categories.all;
  const showingResults = searchQuery ? `Search results for "${searchQuery}"` : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">
              {categoryTitle}
            </h1>
            {showingResults ? (
              <p className="text-xl text-neutral-light">{showingResults}</p>
            ) : (
              <p className="text-xl text-neutral-light">
                Discover our premium collection of fashion wear
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-neutral-medium">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([key, label]) => (
                <Button
                  key={key}
                  variant={currentCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCurrentCategory(key);
                    setSearchQuery('');
                    window.history.pushState({}, '', `/products/${key}`);
                  }}
                  className={currentCategory === key ? "bg-black text-white" : ""}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex gap-4 items-center">
              <form onSubmit={handleSearch} className="flex items-center bg-neutral-light rounded-lg px-4 py-2">
                <Search className="h-4 w-4 text-accent mr-2" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-sm w-64"
                />
              </form>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-1/3" />
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <Filter className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-accent">
                  {searchQuery 
                    ? "Try adjusting your search terms or browse our categories."
                    : "We're currently updating our inventory. Please check back soon."}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentCategory('all');
                    window.history.pushState({}, '', '/products/all');
                  }}
                  className="bg-black text-white"
                >
                  Browse All Products
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-8">
                <p className="text-accent">
                  Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
