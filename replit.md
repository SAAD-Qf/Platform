# Stylish Hub - E-commerce Platform

## Overview

Stylish Hub is a premium fashion e-commerce platform specializing in leather jackets, hoodies, pants, and contemporary fashion wear for men and women. The application is built as a full-stack web application with a modern React frontend and Express.js backend, featuring user authentication, shopping cart functionality, AI-powered customer support, and comprehensive admin management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.
UI/UX Preferences: Modern design with smooth animations and professional black & white aesthetic.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: 
  - Zustand for cart state with persistence
  - TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Clerk for user management and authentication

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **API Design**: RESTful API with structured error handling and request logging
- **File Structure**: Clean separation of concerns with dedicated modules for routes, storage, and database operations

### Database Schema
- **Users**: Integrated with Clerk for authentication, stores additional profile data
- **Products**: Comprehensive product catalog with categories, images, sizes, and inventory
- **Orders**: Complete order management with items, status tracking, and payment methods
- **Cart**: Persistent shopping cart functionality
- **Categories**: Enum-based product categorization (leather-jackets, hoodies, pants, womens-wear, mens-wear)

### Authentication & Authorization
- **Provider**: Clerk handles user authentication, registration, and session management
- **Admin Access**: Role-based access control with admin flag in user profiles
- **Protected Routes**: Admin panel and user-specific features require authentication

### Key Features
- **Product Catalog**: Dynamic product display with filtering, search, and categorization
- **Shopping Cart**: Persistent cart with size selection and quantity management
- **Checkout System**: Multi-step checkout with payment method selection (COD, JazzCash, EasyPaisa)
- **AI Chatbot**: OpenAI-powered customer support for product recommendations and assistance
- **Admin Dashboard**: Complete product and order management with analytics
- **Responsive Design**: Mobile-first approach with responsive layouts

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and migrations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Authentication
- **Clerk**: Complete authentication solution with user management, sessions, and UI components

### AI Integration
- **OpenAI API**: GPT-4o model for AI-powered customer support chatbot functionality

### UI & Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Consistent icon library
- **Google Fonts**: Inter and Poppins fonts for typography

### Development Tools
- **Vite**: Fast build tool with HMR and development server
- **TypeScript**: Static type checking across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment integration with runtime error overlay

### State Management
- **TanStack Query**: Server state management with caching and synchronization
- **Zustand**: Lightweight state management for client-side state (cart)
- **React Hook Form**: Performant form library with validation
- **Zod**: TypeScript-first schema validation

### Payment Processing
- **Local Payment Methods**: JazzCash, EasyPaisa, and Cash on Delivery integration ready
- **Order Management**: Complete order lifecycle tracking and status management

## Recent Updates (January 2025)

### Modern UI Enhancements
- **Enhanced Animations**: Added smooth fade-in, slide-up, scale-in, and hover animations
- **Modern Button Effects**: Shimmer effects and hover transformations
- **Glass Effects**: Backdrop blur and transparency effects for modern look
- **Gradient Text**: Dynamic gradient text animations for headers
- **Enhanced Cards**: 3D hover effects with scale and shadow animations
- **Custom Scrollbars**: Styled scrollbars matching the theme

### Performance Optimizations
- **Smooth Transitions**: CSS cubic-bezier transitions for fluid interactions
- **Lazy Loading**: Optimized image loading for better performance
- **Hover States**: Enhanced interactive elements with lift effects

### Code Accessibility
- **Complete Codebase Guide**: Comprehensive documentation for downloading and setting up locally
- **Deployment Instructions**: Multiple hosting options and environment setup
- **Project Structure**: Detailed file organization and dependencies