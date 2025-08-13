import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-light py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/">
            <div className="flex items-center space-x-2 mb-6">
               <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 border border-white/5">
                   <img
                     src="https://tse4.mm.bing.net/th/id/OIP.kpWhCuGmNgUQB2nmFyGTBAHaHa?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3"
                     alt="Stylish Hub"
                     className="w-10 h-10 object-cover rounded-md"
                     loading="lazy"
                     />
               </div>
              <span className="font-serif text-xl">Stylish Hub</span>
            </div>
            </Link>
            <p className="text-accent mb-6">
              Your destination for premium fashion wear and contemporary style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-accent hover:text-black transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-accent hover:text-black transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-accent hover:text-black transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-accent hover:text-black transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3 text-accent">
              <li>
                <Link href="/">
                  <a className="hover:text-black transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-black transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/products/leather-jackets">
                  <a className="hover:text-black transition-colors">Leather Jackets</a>
                </Link>
              </li>
              <li>
                <Link href="/products/hoodies">
                  <a className="hover:text-black transition-colors">Hoodies</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-xl mb-6">Categories</h3>
            <ul className="space-y-3 text-accent">
              <li>
                <Link href="/products/mens-wear">
                  <a className="hover:text-black transition-colors">Men's Wear</a>
                </Link>
              </li>
              <li>
                <Link href="/products/womens-wear">
                  <a className="hover:text-black transition-colors">Women's Wear</a>
                </Link>
              </li>
              <li>
                <Link href="/products/pants">
                  <a className="hover:text-black transition-colors">Pants</a>
                </Link>
              </li>
              <li>
                <a href="/review
                " className="hover:text-black transition-colors">Reviews</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-xl mb-6">Contact Info</h3>
            <ul className="space-y-3 text-accent">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@stylishhub.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Karachi, Pakistan</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Open 24/7 </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-medium mt-12 pt-8 text-center">
          <p className="text-accent">
            © 2025 Stylish Hub. All rights reserved. | 
            <a href="#privacy" className="hover:text-black transition-colors ml-1">Privacy Policy</a> | 
            <a href="#terms" className="hover:text-black transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
