# 🌍 Mox Voyage - Travel Agency Website

A modern, full-stack travel agency website built with Next.js, featuring role-based authentication, MongoDB integration, and a beautiful responsive design.

## ✨ Features

### 🎯 Core Functionality
- **Destination Management**: Browse and search travel destinations worldwide
- **Contact & Booking**: Integrated contact forms with booking inquiry system
- **Gallery System**: Beautiful travel photo gallery with categorization
- **Testimonials**: Customer reviews and ratings for destinations
- **Multi-language Support**: Internationalization (i18n) ready

### 🔐 Authentication & Security
- **Role-Based Access Control**: Admin, Manager, and Client roles
- **Multiple Auth Methods**: Email/password and Google OAuth
- **Secure Sessions**: JWT-based authentication with NextAuth.js
- **Protected Routes**: Middleware-based route protection
- **Password Security**: bcryptjs hashing for secure storage

### 🎨 User Interface
- **Modern Design**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Components**: Smooth animations and transitions
- **Loading States**: Skeleton loaders and progressive content loading
- **Dark Mode Support**: Theme switching capability

### 🗄️ Database Integration
- **MongoDB Backend**: Full CRUD operations for all content
- **Real-time Data**: Dynamic content loading with error handling
- **Advanced Filtering**: Search and filter destinations, testimonials, and gallery
- **Performance Optimized**: Database indexes and efficient queries

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks and context

### Backend & Database
- **Database**: MongoDB with connection pooling
- **Authentication**: NextAuth.js v4 with custom adapter
- **API Routes**: RESTful APIs with proper error handling
- **Validation**: Zod schemas for type safety

### Development Tools
- **Package Manager**: npm/pnpm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Next.js optimized bundling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or Atlas)
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mox-voyage.git
   cd mox-voyage
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGO_URI=your-mongodb-connection-string
   ```

4. **Seed the database** (optional)
   ```bash
   npm run seed:database
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mox-voyage/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── admin-sidebar.tsx
│   ├── footer.tsx
│   └── header.tsx
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── mongodb.ts        # Database connection
│   └── types.ts          # TypeScript definitions
├── public/                # Static assets
├── scripts/              # Database seeding scripts
└── styles/               # Additional styles
```

## 🔐 Authentication System

### User Roles
- **Admin**: Full system access, can manage all content
- **Manager**: Can manage destinations, testimonials, gallery
- **Client**: Regular users with access to public features

### Test Accounts
After seeding the database, you can use these test accounts:

- **Admin**: `admin@moxvoyage.com` / `admin123`
- **Manager**: `manager@moxvoyage.com` / `manager123`
- **Client**: `john.doe@example.com` / `client123`

## 🗄️ Database Schema

### Collections
- **destinations**: Travel destinations with details, pricing, and images
- **testimonials**: Customer reviews and ratings
- **gallery**: Travel photos with metadata
- **contactSubmissions**: Contact form submissions and booking inquiries
- **users**: User accounts with roles and authentication data

## 📱 Features Overview

### Public Pages
- **Home**: Hero section with featured destinations
- **Destinations**: Browse and search all destinations
- **About**: Company information and services
- **Contact**: Contact form and quote requests

### Admin Features
- **Dashboard**: Real-time statistics and overview
- **Destination Management**: CRUD operations for destinations
- **Testimonial Management**: Customer review management
- **Gallery Management**: Photo gallery administration
- **Contact Management**: Handle booking inquiries

### User Features
- **Authentication**: Secure login and registration
- **Profile Management**: User account settings
- **Personal Dashboard**: User-specific content and history

## 🎨 UI Components

The project uses a comprehensive component library built with:
- **shadcn/ui**: High-quality, accessible components
- **Radix UI**: Unstyled, accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful, consistent icons

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed:database` - Seed database with sample data

### Environment Variables
See `.env.example` for all required environment variables.

### Google OAuth Setup
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

## 🚀 Deployment

### Environment Setup
1. Configure all environment variables in your hosting platform
2. Ensure MongoDB is accessible from your deployment environment
3. Set up Google OAuth for production domain

### Build Process
```bash
npm run build
npm start
```

### Recommended Platforms
- **Vercel**: Optimized for Next.js applications
- **Netlify**: Static site generation with serverless functions
- **AWS**: Full control with Lambda and DocumentDB
- **DigitalOcean**: App Platform with managed databases

## 📊 Performance

### Optimizations
- **Database Indexes**: Optimized queries for fast data retrieval
- **Image Optimization**: Next.js Image component for automatic optimization
- **Code Splitting**: Automatic bundle splitting by Next.js
- **Caching**: Strategic caching for improved performance
- **Loading States**: Skeleton loaders for better perceived performance

### Monitoring
- **Database Performance**: Query optimization and connection pooling
- **API Response Times**: Efficient error handling and response caching
- **User Experience**: Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all components are properly typed
- Test on multiple screen sizes
- Follow the established code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the powerful database solution
- **Unsplash** for the beautiful travel photography

## 📞 Support

For support and inquiries:
- **Email**: support@moxvoyage.com
- **Website**: [moxvoyage.com](https://moxvoyage.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/mox-voyage/issues)

---

**Built with ❤️ for travelers who seek extraordinary experiences**
