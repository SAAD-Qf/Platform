import { useState } from "react";
import { useUser } from "@/lib/clerk";
import { AdminPanel } from "@/components/admin/admin-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-accent">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin (you can modify this logic based on your admin system)
  const isAdmin = user?.isAdmin || user?.email === 'admin@stylishhub.com';

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <CardTitle className="font-poppins text-2xl">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-accent">
              Please sign in to access the admin panel.
            </p>
            <div className="space-y-2">
              <Button className="w-full bg-black text-white">
                Sign In
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="bg-red-500 text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <CardTitle className="font-poppins text-2xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-accent">
              You don't have permission to access the admin panel.
            </p>
            <p className="text-sm text-muted-foreground">
              Only authorized administrators can access this area.
            </p>
            <Link href="/">
              <Button className="w-full bg-black text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Admin Welcome */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="font-poppins text-2xl">
                      Welcome, {user.firstName || 'Admin'}!
                    </CardTitle>
                    <p className="text-accent">Stylish Hub Admin Dashboard</p>
                  </div>
                </div>
                <Link href="/">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Store
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-accent mb-4">
                Manage your e-commerce store from this central dashboard. Monitor sales, manage inventory, process orders, and more.
              </p>
              <Button 
                onClick={() => setShowAdminPanel(true)}
                className="bg-black text-white"
              >
                Open Admin Panel
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAdminPanel(true)}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    📊
                  </div>
                  View Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent">Monitor sales performance, customer metrics, and business insights.</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAdminPanel(true)}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-green-100 text-green-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    📦
                  </div>
                  Manage Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent">Add, edit, or remove products from your inventory.</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAdminPanel(true)}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    🛒
                  </div>
                  Process Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent">View and manage customer orders, update statuses, and track shipments.</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAdminPanel(true)}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-orange-100 text-orange-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    👥
                  </div>
                  Customer Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent">View customer information and manage user accounts.</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAdminPanel(true)}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-red-100 text-red-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    ⚙️
                  </div>
                  Store Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent">Configure store settings, payment methods, and shipping options.</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAdminPanel(true)}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    📈
                  </div>
                  Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent">Generate detailed reports on sales, inventory, and performance.</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-neutral-medium">
                  <div>
                    <p className="font-semibold">New order received</p>
                    <p className="text-sm text-accent">Order #1234 - $299.00</p>
                  </div>
                  <span className="text-sm text-accent">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-medium">
                  <div>
                    <p className="font-semibold">Product updated</p>
                    <p className="text-sm text-accent">Classic Leather Jacket - Stock updated</p>
                  </div>
                  <span className="text-sm text-accent">4 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-medium">
                  <div>
                    <p className="font-semibold">New customer registered</p>
                    <p className="text-sm text-accent">john.doe@example.com</p>
                  </div>
                  <span className="text-sm text-accent">6 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admin Panel Modal */}
      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
    </div>
  );
}
