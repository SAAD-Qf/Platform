# Admin Panel Access Guide

## How to Access the Admin Panel

### Step 1: Create an Account
1. **Sign up/Login** using the "Login" button in the top-right corner
2. **Complete your registration** with Clerk authentication
3. **Wait for admin privileges** to be assigned

### Step 2: Get Admin Access
After registering, you need admin privileges. I've set this up for you automatically.

### Step 3: Access Admin Panel
Once you have admin access:

#### Method 1: Direct URL
- Go to `/admin` in your browser
- Example: `https://your-app.replit.app/admin`

#### Method 2: Through Navigation
- **Login** to your account
- **Look for "Admin"** link in the navigation (appears only for admin users)
- **Click "Admin"** to access the dashboard

## Admin Panel Features

### 📊 Dashboard Overview
- **Total Products**: View and manage inventory count
- **Total Orders**: Track all customer orders
- **Total Revenue**: Monitor sales performance
- **Total Customers**: See user registration metrics

### 📦 Product Management
- **Add New Products**: Create product listings with images, descriptions, pricing
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from catalog
- **Manage Categories**: Organize by Leather Jackets, Hoodies, Pants, Women's/Men's Wear
- **Stock Control**: Track inventory levels and low stock alerts
- **Featured Products**: Mark products as featured for homepage display

### 📋 Order Management
- **View All Orders**: Complete order history and details
- **Update Order Status**: Change status (pending → processing → shipped → delivered)
- **Order Details**: View customer information, shipping addresses, payment methods
- **Revenue Tracking**: Monitor sales by date, payment method, etc.

### 🛠 Admin Controls
- **User Management**: View registered customers
- **Analytics**: Sales and performance metrics
- **Inventory Alerts**: Low stock notifications
- **System Status**: Database and application health

## Admin Privileges Setup

### Automatic Setup (Already Done)
I've automatically configured the first registered user as an admin.

### Manual Setup (If Needed)
If you need to manually set admin privileges:

1. **Access Database** (development only)
2. **Run SQL Command**:
   ```sql
   UPDATE users SET is_admin = true WHERE email = 'your-email@example.com';
   ```

### Security Features
- **Role-Based Access**: Only admin users can access admin panel
- **Protected Routes**: Admin panel requires authentication
- **Secure Database**: All admin actions are logged and validated

## Troubleshooting

### Can't See Admin Link?
1. **Check Login Status**: Make sure you're logged in
2. **Verify Admin Status**: Confirm your account has admin privileges
3. **Clear Browser Cache**: Sometimes navigation updates need a refresh
4. **Try Direct URL**: Go to `/admin` directly

### Admin Panel Not Loading?
1. **Check Browser Console**: Look for JavaScript errors
2. **Verify Database**: Ensure database connection is working
3. **Check Network**: Confirm API endpoints are responding
4. **Contact Support**: If issues persist

### Access Denied Error?
1. **Confirm Login**: Make sure you're authenticated
2. **Check Admin Status**: Verify your account has `is_admin = true`
3. **Database Issue**: Check if user table exists and is populated

## Development vs Production

### Development (Current)
- **Automatic Admin**: First user becomes admin automatically
- **Easy Access**: Direct database access for testing
- **Full Permissions**: All admin features enabled

### Production Deployment
- **Manual Admin Setup**: Admins must be set manually for security
- **Environment Variables**: Admin emails can be configured via env vars
- **Audit Logging**: All admin actions are tracked

## Support

If you need help accessing the admin panel:
1. **Check this guide** for common solutions
2. **Verify login status** and admin privileges
3. **Contact development team** for technical issues

Your admin panel is fully functional with modern UI, real-time updates, and comprehensive management tools!