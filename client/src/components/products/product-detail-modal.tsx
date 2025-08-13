import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Heart, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";


interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { addItem } = useCartStore();
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Size selection is required for this product.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      addItem({
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.images?.[0] || '',
        size: selectedSize,
        quantity,
      });
      
      toast({
        title: "Added to cart",
        description: `${quantity}x ${product.name} ${selectedSize ? `(${selectedSize})` : ''} added to cart.`,
      });
      
      setIsLoading(false);
      onClose();
    }, 500);
  };

  const primaryImage = product.images?.[selectedImageIndex] || 'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins font-bold text-2xl">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full rounded-lg mb-4"
            />
            
            {/* Image Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 ${
                      index === selectedImageIndex ? 'border-black' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.featured && <Badge className="bg-black text-white">Featured</Badge>}
            </div>
            
            <p className="text-accent mb-6">{product.description}</p>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "bg-black text-white" : ""}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border border-neutral-medium rounded text-center min-w-[3rem]">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {product.stock} items available
              </p>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || product.stock === 0}
                className="flex-1 bg-black text-white hover:bg-accent transition-colors"
              >
                {isLoading ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            {/* Product Details */}
            <div>
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ul className="text-accent space-y-2">
                <li>• Premium quality materials</li>
                <li>• Modern design and fit</li>
                <li>• Available in multiple sizes</li>
                <li>• Professional craftsmanship</li>
                <li>• 30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
