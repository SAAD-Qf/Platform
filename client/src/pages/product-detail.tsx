import { useState, useRef } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, Heart, ArrowLeft, Share2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const { data: product, isLoading: isProductLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = imageContainerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * 10; 
    const rotateY = ((x / width) - 0.5) * -10;

    container.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
  };

  const handleMouseLeave = () => {
    const container = imageContainerRef.current;
    if (container) {
      container.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`;
    }
  };

  if (isProductLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-accent mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/products/all">
            <Button className="bg-black text-white">Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryImage =
    product.images?.[selectedImageIndex] ||
    "https://via.placeholder.com/600x600?text=No+Image";

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
        image: product.images?.[0] || "",
        size: selectedSize,
        quantity,
      });
      toast({
        title: "Added to cart",
        description: `${quantity}x ${product.name} ${
          selectedSize ? `(${selectedSize})` : ""
        } added to cart.`,
      });
      setIsLoading(false);
    }, 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="py-4 border-b border-neutral-medium">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/">
              <a className="text-accent hover:text-black transition-colors">Home</a>
            </Link>
            <span className="text-accent">/</span>
            <Link href={`/products/${product.category}`}>
              <a className="text-accent hover:text-black transition-colors capitalize">
                {product.category.replace("-", " ")}
              </a>
            </Link>
            <span className="text-accent">/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative mb-4 rounded-xl overflow-hidden cursor-zoom-in transition-transform duration-300 ease-out shadow-lg"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={primaryImage}
                  alt={product.name}
                  key={primaryImage} // triggers fade when image changes
                  className="w-full h-auto object-cover select-none pointer-events-none animate-fadeIn"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-black text-white">
                    Featured
                  </Badge>
                )}
                {product.stock <= 10 && product.stock > 0 && (
                  <Badge variant="destructive" className="absolute top-4 right-4">
                    Low Stock
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Image Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 flex-shrink-0 transition-transform duration-300 hover:scale-110 ${
                        index === selectedImageIndex
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Link href={`/products/${product.category}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-black"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to {product.category.replace("-", " ")}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <h1 className="font-poppins font-bold text-3xl mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold">${product.price}</span>
                {product.featured && (
                  <Badge className="bg-black text-white">Featured</Badge>
                )}
              </div>

              <p className="text-accent text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <label className="block font-semibold text-lg mb-3">Size</label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] ${
                          selectedSize === size ? "bg-black text-white" : ""
                        }`}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block font-semibold text-lg mb-3">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-neutral-medium rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-6 py-2 border-x border-neutral-medium bg-neutral-light min-w-[4rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      disabled={quantity >= product.stock}
                      className="rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {product.stock} items available
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || product.stock === 0}
                  className="flex-1 bg-black text-white hover:bg-accent transition-colors py-4 text-lg"
                >
                  {isLoading
                    ? "Adding..."
                    : product.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>
                <Button variant="outline" size="icon" className="py-4 px-4">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="my-8" />

              {/* Product Features */}
              <div>
                <h3 className="font-semibold text-xl mb-6">Product Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-accent">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Premium quality materials
                  </li>
                  <li className="flex items-center text-accent">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Modern design and comfortable fit
                  </li>
                  <li className="flex items-center text-accent">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Available in multiple sizes
                  </li>
                  <li className="flex items-center text-accent">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Professional craftsmanship
                  </li>
                  <li className="flex items-center text-accent">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    30-day return policy
                  </li>
                  <li className="flex items-center text-accent">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Free shipping on orders over $100
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-4 border-b border-neutral-medium">
        <div className="container mx-auto px-4">
          <Skeleton className="h-4 w-64" />
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Skeleton className="w-full h-96 rounded-xl mb-4" />
              <div className="flex space-x-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
