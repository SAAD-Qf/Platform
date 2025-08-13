import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Globe, Heart, Shield, Truck } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
                About Stylish Hub
              </h1>
              <p className="text-xl mb-6 text-neutral-light">
                We are passionate about bringing you the finest collection of fashion wear that combines style, quality, and affordability.
              </p>
              <p className="text-neutral-light mb-8">
                Since our founding, we've been committed to curating premium leather jackets, hoodies, pants, and fashion wear for both men and women. Our team of fashion experts carefully selects each piece to ensure it meets our high standards of quality and style.
              </p>
              <Link href="/products/all">
                <Button className="bg-white text-black hover:bg-neutral-light transition-colors">
                  Shop Our Collection
                </Button>
              </Link>
            </div>
            <div>
              <img 
                src="/images/gif.gif" 
                alt="Modern fashion store interior" 
                className="rounded-xl shadow-2xl w-full" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="font-poppins font-bold text-3xl md:text-4xl mb-2">500+</h3>
              <p className="text-accent">Premium Products</p>
            </div>
            <div className="text-center">
              <h3 className="font-poppins font-bold text-3xl md:text-4xl mb-2">10K+</h3>
              <p className="text-accent">Happy Customers</p>
            </div>
            <div className="text-center">
              <h3 className="font-poppins font-bold text-3xl md:text-4xl mb-2">50+</h3>
              <p className="text-accent">Fashion Brands</p>
            </div>
            <div className="text-center">
              <h3 className="font-poppins font-bold text-3xl md:text-4xl mb-2">24/7</h3>
              <p className="text-accent">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-poppins font-bold text-4xl mb-6">Our Story</h2>
              <p className="text-xl text-accent">
                Building a fashion destination that celebrates individual style
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="font-poppins font-semibold text-2xl mb-4">Founded on Quality</h3>
                <p className="text-accent mb-6">
                  Stylish Hub was born from a simple belief: everyone deserves access to high-quality, stylish clothing that doesn't break the bank. We started with a small collection of carefully curated pieces and have grown into a comprehensive fashion destination.
                </p>
                <p className="text-accent">
                  Our commitment to quality means every item in our collection undergoes rigorous selection processes. We partner with trusted manufacturers and designers who share our vision of creating lasting, beautiful fashion.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Fashion design process" 
                  className="rounded-xl shadow-lg w-full" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Fashion sustainability" 
                  className="rounded-xl shadow-lg w-full" 
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-poppins font-semibold text-2xl mb-4">Sustainable Fashion</h3>
                <p className="text-accent mb-6">
                  We believe fashion should be beautiful, not just on the outside, but in its impact on the world. That's why we're committed to sustainable practices, from sourcing eco-friendly materials to ensuring fair labor practices throughout our supply chain.
                </p>
                <p className="text-accent">
                  Our goal is to create timeless pieces that you'll love for years to come, reducing the need for fast fashion and contributing to a more sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl mb-6">Our Values</h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              The principles that guide everything we do at Stylish Hub
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-4">Quality First</h3>
                <p className="text-accent">
                  We never compromise on quality. Every product is carefully selected and tested to meet our high standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-4">Customer Love</h3>
                <p className="text-accent">
                  Our customers are at the heart of everything we do. We're here to help you find your perfect style.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-4">Sustainability</h3>
                <p className="text-accent">
                  We're committed to sustainable practices that protect our planet for future generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl mb-6">Why Choose Stylish Hub?</h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Experience the difference that sets us apart from other fashion retailers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                <p className="text-accent">30-day return policy and lifetime customer support for all purchases.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-accent">Free shipping on orders over $100. Express delivery available.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Expert Curation</h3>
                <p className="text-accent">Our fashion experts handpick every item to ensure the best selection.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Style Guidance</h3>
                <p className="text-accent">Personal styling advice and size guidance from our fashion consultants.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Badge className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Exclusive Collections</h3>
                <p className="text-accent">Access to limited edition pieces and exclusive designer collaborations.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
                <p className="text-accent">Worldwide shipping with local customer support in multiple languages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-4xl mb-6">
            Ready to Discover Your Style?
          </h2>
          <p className="text-xl text-neutral-light mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect fashion pieces with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products/all">
              <Button className="bg-white text-black shadow-lg shadow-white hover:animate-fade-in hover:bg-neutral-light transition-colors px-8 py-2">
                Shop Collection
              </Button>
            </Link>
            <Link href="/products/featured">
              <Button variant="outline" className="border-white text-black shadow-lg shadow-white hover:animate-fade-in hover:bg-white hover:text-black transition-colors px-8 py-2">
                View Featured Items
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
