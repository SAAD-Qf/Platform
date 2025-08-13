import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProductGrid } from "@/components/products/product-grid";

export default function Home() {

   const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e:any) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - top) / height - 0.5) * 15;
    const y = ((e.clientX - left) / width - 0.5) * 15;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
       <section className="bg-black text-white py-20 relative overflow-hidden">
      {/* Animated Luxury Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black animate-gradient"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="font-semibold text-white text-5xl md:text-6xl mb-6 gradient-text drop-shadow-2xl rounded-lg drop-shadow-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Premium Fashion <br />
              <span className="text-white">Collection</span>
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-gray-400 leading-relaxed drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Discover our curated selection of leather jackets, hoodies, and
              premium wear designed for the modern lifestyle.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products/all">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  className="bg-white text-black px-8 py-4 rounded-lg font-semibold shadow-xl hover:bg-gray-200 transition-all"
                >
                  Shop Now
                </motion.button>
              </Link>
              <Link to="/products/featured">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-all"
                >
                  View Collection
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Image Section with Tilt */}
          <motion.div
            className="relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src="/images/c.gif" 
              alt="Luxury Jacket"
              className="rounded-2xl shadow-2xl w-4/5 mx-auto border border-white shadow-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
      {/* Featured Categories */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl mb-4">Shop by Category</h2>
            <p className="text-xl text-accent">Explore our premium collections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              title="Leather Jackets"
              description="Premium crafted leather wear"
              image="https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              href="/products/leather-jackets"
            />
            
            <CategoryCard
              title="Hoodies"
              description="Comfort meets style"
              image="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              href="/products/hoodies"
            />
            
            <CategoryCard
              title="Pants"
              description="Tailored to perfection"
              image="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              href="/products/pants"
            />
            
            <CategoryCard
              title="Women's Wear"
              description="Elegant and contemporary"
              image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              href="/products/womens-wear"
            />
            
            <CategoryCard
              title="Men's Wear"
              description="Sharp and sophisticated"
              image="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              href="/products/mens-wear"
            />
            
            <div className="bg-black text-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
              <Link href="/products/featured">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Modern clothing store interior display" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 opacity-60" 
                />
                <div className="p-6">
                  <h3 className="font-poppins font-semibold text-2xl mb-2">New Arrivals</h3>
                  <p className="text-neutral-light mb-4">Latest fashion trends</p>
                  <Button variant="ghost" className="text-white font-semibold hover:underline p-0">
                    Discover New →
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid 
        featured={true}
        title="Featured Products"
        subtitle="Handpicked for you"
      />

      {/* About Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins font-bold text-4xl mb-6">About Stylish Hub</h2>
              <p className="text-xl mb-6 text-neutral-light">
                We are passionate about bringing you the finest collection of fashion wear that combines style, quality, and affordability.
              </p>
              <p className="text-neutral-light mb-8">
                Since our founding, we've been committed to curating premium leather jackets, hoodies, pants, and fashion wear for both men and women. Our team of fashion experts carefully selects each piece to ensure it meets our high standards of quality and style.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl mb-2">500+</h3>
                  <p className="text-neutral-light">Premium Products</p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">10K+</h3>
                  <p className="text-neutral-light">Happy Customers</p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">50+</h3>
                  <p className="text-neutral-light">Fashion Brands</p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">24/7</h3>
                  <p className="text-neutral-light">Customer Support</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500" 
                alt="Modern fashion store interior" 
                className="rounded-xl shadow-2xl w-full" 
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Helper Component
function CategoryCard({ title, description, image, href }: {
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
        <img 
          src={image} 
          alt={`${title} collection`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="p-6">
          <h3 className="font-poppins font-semibold text-2xl mb-2">{title}</h3>
          <p className="text-accent mb-4">{description}</p>
          <Button variant="ghost" className="text-black font-semibold hover:underline p-0">
            Explore Collection →
          </Button>
        </div>
      </div>
    </Link>
  );
}
