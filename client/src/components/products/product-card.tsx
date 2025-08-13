import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    
    setTimeout(() => {
      addItem({
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.images?.[0] || '',
        quantity: 1,
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
      
      setIsLoading(false);
    }, 500);
  };

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400';

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="modern-card hover-lift cursor-pointer overflow-hidden group animate-fade-in">
        <div className="relative">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-500"
            loading="lazy"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-black text-white">
              Featured
            </Badge>
          )}
          {product.stock <= 10 && product.stock > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Low Stock
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="font-semibold text-xl mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-accent mb-3 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl">${product.price}</span>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || product.stock === 0}
              className="modern-button bg-black text-white hover:bg-accent transition-all hover-lift"
            >
              {isLoading ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {product.sizes.slice(0, 4).map((size) => (
                <Badge key={size} variant="outline" className="text-xs">
                  {size}
                </Badge>
              ))}
              {product.sizes.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{product.sizes.length - 4} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
