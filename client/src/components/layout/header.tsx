import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { SignInButton, UserButton, useUser } from "@/lib/clerk";
import { useCartStore } from "@/lib/cart-store";
import { AuthModal } from "@/components/auth/auth-modal";

const categories = [
  { label: "Leather Jackets", value: "leather-jackets" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Pants", value: "pants" },
  { label: "Women's Wear", value: "womens-wear" },
  { label: "Men's Wear", value: "mens-wear" },
];

export function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleCart, getItemCount } = useCartStore();
  const { isSignedIn, isLoading } = useUser();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products with search query
      window.location.href = `/products/all?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className={`transition-all duration-300 sticky top-0 z-50 ${
        isScrolled 
          ? 'glass-effect shadow-lg backdrop-blur-md' 
          : 'bg-white border-b border-neutral-medium'
      }`}>
        <div className="container mx-auto px-4 py-1 rounded-sm shadow-inner shadow-black">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer hover:translate-y-[-2px] transition-transform duration-200">
                {/* Logo image */}
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 border border-white/5">
                   <img
                     src="https://tse4.mm.bing.net/th/id/OIP.kpWhCuGmNgUQB2nmFyGTBAHaHa?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3"
                     alt="Stylish Hub"
                     className="w-10 h-10 object-cover rounded-md"
                     loading="lazy"
                     />
               </div>
               <div className="text-lg font-serif text-black">Stylish Hub</div>
               </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 animate-slide-up">
              <Link href="/">
                <a className={`hover:text-accent transition-all hover-lift ${location === '/' ? 'text-accent font-semibold text-center justify-center' : ''}`}>
                  Home
                </a>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hover:text-center justify-center text-black transition-all hover-lift">
                    Products <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.value} asChild>
                      <Link href={`/products/${category.value}`}>
                        <a className="w-full">{category.label}</a>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/about">
                <a className={`hover:text-accent transition-all hover-lift ${location === '/about' ? 'text-accent font-semibold' : ''}`}>
                  About
                </a>
              </Link>
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-neutral-light rounded-lg px-4 py-2 w-64 hover-lift transition-all">
              <Search className="h-4 w-4 text-accent mr-2" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-sm focus:ring-0"
              />
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 animate-scale-in">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCart}
                className="relative hover:text-accent transition-all hover-lift"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-subtle">
                    {itemCount}
                  </span>
                )}
              </Button>

              {/* Auth Section */}
              {!isLoading && (
                <>
                  {isSignedIn ? (
                    <UserButton afterSignOutUrl="/" />
                  ) : (
                    <SignInButton mode="modal">
                      <Button className="modern-button bg-black text-white hover:bg-accent transition-all hover-lift ">
                        Login
                      </Button>
                    </SignInButton>
                  )}
                </>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-poppins font-semibold text-xl">Menu</span>
                  </div>
                  <nav className="space-y-4">
                    <Link href="/">
                      <a className="block py-2">Home</a>
                    </Link>
                    {categories.map((category) => (
                      <Link key={category.value} href={`/products/${category.value}`}>
                        <a className="block py-2">{category.label}</a>
                      </Link>
                    ))}
                    <Link href="/about">
                      <a className="block py-2">About</a>
                    </Link>
                    
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="flex items-center bg-neutral-light rounded-lg px-3 py-2 mt-4">
                      <Search className="h-4 w-4 text-accent mr-2" />
                      <Input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none text-sm"
                      />
                    </form>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
