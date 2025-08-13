import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Home } from "lucide-react";

export default function PaymentSuccess() {
  useEffect(() => {
    // You could fetch order details here if needed
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="font-poppins text-2xl text-green-800">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-accent">
                Thank you for your purchase! Your order has been confirmed and is being processed.
              </p>
              <p className="text-sm text-accent">
                You will receive an email confirmation shortly with your order details.
              </p>
            </div>

            <div className="bg-neutral-light p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Package className="h-4 w-4" />
                <span>Your order will be processed within 1-2 business days</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/products">
                <Button className="w-full bg-black text-white">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}