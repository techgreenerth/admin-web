# Greenerth - Admin & Partner Portal

**Greenerth Admin & Partner Portal** is a comprehensive React-based web application that provides powerful management, verification, and tracking tools for the biochar carbon credit platform. Built with modern web technologies, it offers real-time monitoring, production workflow management, and analytics features for biochar production operations.

## 🚀 Project Overview

This is the **unified web portal** for the **Greenerth Biochar Platform** ecosystem which serves:

- **Admin Dashboard** - Complete platform management, production oversight, and analytics
- **Supervisor Portal** (Implementation Partners) - Site management and production tracking
- **CSI Manager Tools** - Access to verified records and compliance data
- **Production Workflow** - End-to-end biochar production tracking from biomass to bulk density

## ✨ Key Features

### 🔐 Role-Based Access Control

- **Super Admin** - Full platform access and admin user management
- **Admin** - Platform management, verification, and configuration
- **Supervisor** (Implementation Partners) - Site-level management and production oversight
- **CSI Manager** - Access to verified records and compliance data

### 👥 User & Entity Management

#### Admin Functions

- **User management** - Create and manage users with role-based access
- **Admin management** - Super admin can create and manage admin users
- **Site management** - Create, edit, and monitor production sites
- **Kontiki (Kiln) inventory** - Track and manage kilns across sites
- **User assignment** - Assign and revoke user access to specific sites
- **Profile management** - User profile and account settings

#### Supervisor Functions

- **Site oversight** - Monitor assigned production sites
- **Production tracking** - Track biochar production workflow
- **Shift management** - Manage work shifts and schedules
- **User coordination** - Work with assigned site users

### 🌾 Production Workflow Management

The platform tracks the complete biochar production workflow across five key stages:

#### 1. Biomass Sourcing
- **Delivery tracking** - Record biomass deliveries with timestamps
- **Photo documentation** - Visual evidence of biomass materials
- **Quantity logging** - Track biomass volumes and weights
- **Source tracking** - Record biomass source information

#### 2. Biochar Production
- **Production batches** - Create and track production batches
- **Kontiki assignment** - Assign kilns to production batches
- **Production monitoring** - Track production progress and status
- **Photo verification** - Document production stages visually
- **Data logging** - Record production parameters and metrics

#### 3. Biochar Activation
- **Activation records** - Track biochar activation process
- **Bio-agent tracking** - Record activation agents used
- **Process documentation** - Photo and data evidence
- **Batch linkage** - Connect activation to production batches

#### 4. Biochar Sampling
- **Sample collection** - Record biochar samples taken
- **Sample documentation** - Photo evidence and metadata
- **Lab submission tracking** - Track samples sent for analysis
- **Quality verification** - Document quality control measures

#### 5. Bulk Density Measurement
- **Density calculations** - Calculate and record bulk density
- **Measurement tracking** - Track density measurements over time
- **Photo verification** - Visual documentation of measurements
- **Data validation** - Ensure measurement accuracy

### 📊 Site & Shift Management

#### Site Management
- **Site creation** - Create and configure production sites
- **Site details** - View comprehensive site information
- **User assignment** - Assign and manage users per site
- **Kontiki tracking** - Track kilns assigned to each site
- **Site folders** - Organize site-related documents and files
- **Status monitoring** - Track site operational status

#### Shift Management
- **Shift scheduling** - Create and manage work shifts
- **User assignment** - Assign users to shifts
- **Time tracking** - Monitor shift start and end times
- **Production linkage** - Connect shifts to production activities
- **Historical records** - View past shift data and performance

### 📈 Dashboard & Analytics

#### Admin Dashboard
- **Overview metrics** - Key performance indicators at a glance
- **Production statistics** - Track biochar production across all sites
- **Site overview** - Monitor all production sites and their status
- **User activity** - Track user engagement and activity
- **Recent activities** - View latest system activities and updates
- **Quick actions** - Access frequently used features quickly

### 🔧 Additional Features

#### CSI Verified Records (CSI Manager)
- **Verified data access** - View verified biochar production records
- **Compliance tracking** - Monitor compliance with CSI standards
- **Data export** - Export verified records for reporting

#### Profile & Settings
- **User profile** - Manage personal account information
- **Settings** - Configure user preferences and account settings
- **Help & Support** - Access help documentation and support resources

## 🛠 Tech Stack

### Core Framework

- **React** `^18.3.1` - Modern React with hooks and concurrent features
- **TypeScript** `^5.8.3` - Type-safe JavaScript development
- **Vite** `^5.4.19` - Fast build tool and development server

### UI & Design System

- **Radix UI** - Headless, accessible UI components
  - `@radix-ui/react-dialog: ^1.1.14` - Modal dialogs
  - `@radix-ui/react-dropdown-menu: ^2.1.15` - Dropdown menus
  - `@radix-ui/react-tabs: ^1.1.12` - Tab navigation
  - `@radix-ui/react-select: ^2.2.5` - Select components
  - `@radix-ui/react-accordion: ^1.2.11` - Accordion components
  - `@radix-ui/react-tooltip: ^1.2.7` - Tooltips
  - `@radix-ui/react-toast: ^1.2.14` - Toast notifications
  - Plus 15+ other Radix UI components
- **Tailwind CSS** `^3.4.17` - Utility-first CSS framework
- **Lucide React** (`lucide-react: ^0.462.0`) - Modern icon library
- **Class Variance Authority** (`class-variance-authority: ^0.7.1`) - Component variants
- **Shadcn/ui** - Re-usable component library built on Radix UI

### State Management

- **Redux Toolkit** (`@reduxjs/toolkit: ^2.11.2`) - Modern Redux state management
- **React Redux** (`react-redux: ^9.2.0`) - React bindings for Redux
- **React Context API** - Context providers for feature-specific state

### Data Fetching & API

- **TanStack Query** (`@tanstack/react-query: ^5.83.0`) - Server state management and caching
- **Axios** (`axios: ^1.13.2`) - HTTP client for API requests with interceptors
- **React Hook Form** (`react-hook-form: ^7.61.1`) - Performant form management
- **Hookform Resolvers** (`@hookform/resolvers: ^3.10.0`) - Form validation integration
- **Zod** (`zod: ^3.25.76`) - TypeScript-first schema validation

### Routing & Navigation

- **React Router DOM** (`react-router-dom: ^6.30.1`) - Client-side routing with role-based guards

### Data Visualization & Charts

- **Recharts** (`recharts: ^2.15.4`) - React charting library for dashboard analytics

### Development Tools

- **ESLint** (`eslint: ^9.32.0`) - Code linting with modern flat config
- **TypeScript ESLint** (`typescript-eslint: ^8.38.0`) - TypeScript-specific linting rules
- **Vite Plugin React SWC** (`@vitejs/plugin-react-swc: ^3.11.0`) - Fast refresh with SWC
- **Tailwind Typography** (`@tailwindcss/typography: ^0.5.16`) - Typography plugin

### Utilities

- **Date-fns** (`date-fns: ^3.6.0`) - Modern date manipulation library
- **clsx** (`clsx: ^2.1.1`) - Conditional CSS class composition
- **Tailwind Merge** (`tailwind-merge: ^2.6.0`) - Merge Tailwind classes intelligently
- **React Hot Toast** (`react-hot-toast: ^2.6.0`) - Toast notifications
- **Sonner** (`sonner: ^1.7.4`) - Toast component library
- **Next Themes** (`next-themes: ^0.3.0`) - Theme management (dark/light mode)

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** `>=18.0.0`
- **npm** , **yarn** , or **pnpm**
- **Git** for version control

### 1. Clone the Repository

```bash
git clone <repository-url>
cd admin-web
```

### 2. Install Dependencies

```bash
# Using npm (recommended)
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Environment Configuration

Create `.env.local` file with required variables:

```bash
# API Configuration
VITE_API_BASE_URL="http://localhost:3000/api"
VITE_APP_ENV="development"

# Add other environment variables as needed for your backend API
```

**Note:** The project uses `.env.local` for local development. Never commit this file to version control.

### 4. Run the Application

#### Development

```bash
# Start development server
npm run dev

# Runs on http://localhost:5173
```

#### Build for Production

```bash
# Build the application
npm run build

# Build for development mode
npm run build:dev
```

#### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

### 5. Development Tools

#### Code Quality

```bash
# Run linting
npm run lint
```

## 📁 Project Architecture

The web portal follows **feature-based architecture** with **component-driven development** principles, organized by user role and functionality.

```text
src/
├── App.tsx                          # Main App component with routing
├── App.css                          # App-specific styles
├── main.tsx                         # Application entry point
├── index.css                        # Global styles and Tailwind imports
├── vite-env.d.ts                    # Vite environment types
│
├── components/                      # Reusable UI components
│   ├── ui/                          # Shadcn/ui components (50+ components)
│   │   ├── button.tsx               # Button component
│   │   ├── dialog.tsx               # Modal dialog
│   │   ├── dropdown-menu.tsx        # Dropdown menu
│   │   ├── tabs.tsx                 # Tab navigation
│   │   ├── select.tsx               # Select component
│   │   ├── card.tsx                 # Card container
│   │   ├── toast.tsx                # Toast notifications
│   │   ├── sidebar.tsx              # Sidebar component
│   │   └── ...                      # And many more
│   ├── layout/                      # Layout components
│   │   ├── AppLayout.tsx            # Main application layout
│   │   ├── AppSidebar.tsx           # Navigation sidebar
│   │   ├── Header.tsx               # Application header
│   │   └── SidebarNavItem.tsx       # Sidebar navigation items
│   ├── auth/                        # Authentication components
│   │   ├── ProtectedRoute.tsx       # Route protection wrapper
│   │   └── ...
│   ├── kontikis/                    # Kontiki (kiln) components
│   │   ├── CreateKontikiDialog.tsx  # Create kiln dialog
│   │   ├── EditKontikiDialog.tsx    # Edit kiln dialog
│   │   └── ViewKontikiDialog.tsx    # View kiln details
│   ├── sites/                       # Site management components
│   │   ├── CreateSiteDialog.tsx     # Create site dialog
│   │   ├── EditSiteDialog.tsx       # Edit site dialog
│   │   ├── ViewSiteDetailsDialog.tsx # View site details
│   │   ├── AssignUserDialog.tsx     # Assign user to site
│   │   ├── RevokeUserDialog.tsx     # Revoke user access
│   │   ├── FolderDialog.tsx         # Site folder management
│   │   └── ViewFileDialog.tsx       # View site files
│   ├── DataProviders.tsx            # Data context providers wrapper
│   ├── GlobalLoader.tsx             # Global loading state
│   └── NavLink.tsx                  # Navigation link component
│
├── contexts/                        # React context providers
│   ├── AuthContext.tsx              # Authentication state & methods
│   ├── DashboardContext.tsx         # Dashboard data context
│   ├── siteContext.tsx              # Site management context
│   ├── kontikisContext.tsx          # Kontiki management context
│   ├── biomassSourcingContext.tsx   # Biomass sourcing context
│   ├── biocharProductionContext.tsx # Biochar production context
│   ├── biocharActivationContext.tsx # Biochar activation context
│   ├── biocharSamplingContext.tsx   # Biochar sampling context
│   ├── bulkDensityContext.tsx       # Bulk density context
│   └── ProfileContext.tsx           # User profile context
│
├── hooks/                           # Custom React hooks
│   └── ...                          # Feature-specific hooks
│
├── lib/                             # Utilities and services
│   ├── api/                         # API services
│   │   ├── axios.ts                 # Axios instance with interceptors
│   │   ├── auth.service.ts          # Authentication API calls
│   │   ├── admin.service.ts         # Admin API calls
│   │   ├── user.service.ts          # User management API
│   │   ├── sites.service.ts         # Site management API
│   │   ├── kontikis.service.ts      # Kontiki management API
│   │   ├── biomassSourcing.service.ts
│   │   ├── biocharProduction.service.ts
│   │   ├── biocharActivation.service.ts
│   │   ├── biocharSampling.service.ts
│   │   ├── bulkDensity.service.ts
│   │   ├── dashboard.service.ts     # Dashboard data API
│   │   ├── profile.service.ts       # User profile API
│   │   └── csi/                     # CSI-specific services
│   └── utils/                       # Utility functions
│       └── ...                      # Helper utilities
│
├── pages/                           # Page components (route-based)
│   ├── auth/                        # Authentication pages
│   │   ├── Login.tsx                # Login page
│   │   └── RoleGate.tsx             # Role-based access guard
│   │
│   ├── admin/                       # Admin & Supervisor pages
│   │   ├── AdminDashboard.tsx       # Dashboard with analytics
│   │   ├── Users.tsx                # User management
│   │   ├── Admins.tsx               # Admin user management (Super Admin only)
│   │   ├── Sites.tsx                # Site management
│   │   ├── SiteDetails.tsx          # Individual site details
│   │   ├── Kontikis.tsx             # Kontiki (kiln) management
│   │   ├── Shifts.tsx               # Shift management
│   │   ├── BiomassSourcing.tsx      # Biomass sourcing tracking
│   │   ├── BiocharProduction.tsx    # Biochar production tracking
│   │   ├── BiocharActivation.tsx    # Biochar activation tracking
│   │   ├── BiocharSampling.tsx      # Biochar sampling tracking
│   │   ├── BulkDensity.tsx          # Bulk density measurements
│   │   ├── Profile.tsx              # User profile & settings
│   │   ├── HelpSupport.tsx          # Help & support page
│   │   └── Settings.tsx             # Application settings
│   │
│   ├── Csi/                         # CSI Manager pages
│   │   └── CsiVerifiedRecords.tsx   # Verified records view
│   │
│   ├── NotFound.tsx                 # 404 page
│   └── Unauthorized.tsx             # 403 unauthorized page
│
├── store/                           # Redux state management
│   ├── kontikis/                    # Kontiki store slices
│   └── ...                          # Other store modules
│
├── types/                           # TypeScript type definitions
│   ├── auth.types.ts                # Authentication & role types
│   ├── site.types.ts                # Site types
│   ├── kontikis.types.ts            # Kontiki types
│   ├── biomassSourcing.types.ts     # Biomass sourcing types
│   ├── biocharProduction.types.ts   # Production types
│   ├── biocharActivation.types.ts   # Activation types
│   ├── biocharSampling.types.ts     # Sampling types
│   ├── bulkDensity.types.ts         # Bulk density types
│   ├── dashboard.types.ts           # Dashboard types
│   └── profile.types.ts             # Profile types
│
└── constrants/                      # Application constants
    └── roles.ts                     # Role definitions
```

### Key Architecture Patterns

- **Component-Based Architecture** : Modular, reusable UI components with Shadcn/ui
- **Feature-Based Organization** : Code organized by production workflow modules
- **Context API Pattern** : React Context for feature-specific state management
- **Custom Hooks Pattern** : Business logic abstraction with React hooks
- **Role-Based Routing** : Protected routes with RoleGate components
- **Service Layer** : Dedicated API service files for each feature
- **Redux Toolkit** : State management for complex features (e.g., Kontikis)
- **Type-Safe Development** : Comprehensive TypeScript with strict typing

## 🎨 Design System

### Component Library

- **Shadcn/ui** : Beautiful, accessible components built on Radix UI
- **Radix UI Primitives** : Headless, accessible component primitives
- **50+ UI Components** : Comprehensive component library
- **Consistent Styling** : Tailwind CSS with utility-first approach
- **Theme Support** : Dark/light mode with next-themes

### Styling Approach

- **Tailwind CSS** : Utility-first CSS framework
- **Component Variants** : CVA (Class Variance Authority) for component variations
- **Responsive Design** : Mobile-first responsive layouts
- **Accessibility** : WCAG-compliant components from Radix UI

## 🚦 Development Guidelines

### Getting Started for New Developers

1. **Understand the Production Workflow** : Learn the 5-stage biochar production process
2. **Study Role-Based Access** : Understand Super Admin, Admin, Supervisor, and CSI Manager roles
3. **Review Component Library** : Examine Shadcn/ui components and patterns
4. **Study API Integration** : Look at existing service files and context providers
5. **Understand Context Pattern** : Learn how feature contexts manage state
6. **Follow React Patterns** : Use hooks, context, and modern React patterns
7. **Review Type Definitions** : Study TypeScript types for each module

### Code Style & Standards

- **TypeScript** : Use strict typing with proper interfaces and types
- **ESLint** : Automated code linting with modern flat config
- **Component Naming** : Use PascalCase for components, camelCase for functions
- **File Organization** : Group related functionality in feature modules
- **Accessibility** : Radix UI provides accessible components by default
- **Context Pattern** : Use React Context for feature-specific state
- **Service Layer** : Keep API calls in dedicated service files

### Development Workflow

1. **Create Feature Branch** : `git checkout -b feature/module-name`
2. **Implement Changes** : Follow existing patterns and conventions
3. **Type Checking** : Run `yarn typecheck` to verify TypeScript
4. **Code Quality** : Run `yarn lint:fix` for code formatting
5. **Test Functionality** : Test in browser with different screen sizes
6. **CSI Compliance** : Verify data displays match CSI requirements
7. **Code Review** : Submit PR with clear description

### Common Development Tasks

#### Adding a New Page

1. Create page component in `src/pages/admin/` or appropriate directory
2. Add route in `src/App.tsx` with proper role guard
3. Create context provider in `src/contexts/` if needed
4. Add navigation item in `src/components/layout/AppSidebar.tsx`
5. Create types in `src/types/`
6. Add API service in `src/lib/api/`

#### Adding a New Feature Module

1. Create context provider in `src/contexts/[feature]Context.tsx`
2. Create API service in `src/lib/api/[feature].service.ts`
3. Create types in `src/types/[feature].types.ts`
4. Create page component in `src/pages/admin/[Feature].tsx`
5. Create feature-specific dialog components in `src/components/[feature]/`
6. Add DataProvider in `src/components/DataProviders.tsx`

#### Creating UI Components

1. Use Shadcn/ui components from `src/components/ui/`
2. Create feature-specific components in dedicated folders
3. Follow existing dialog patterns for modals
4. Use React Hook Form + Zod for forms
5. Add TypeScript interfaces for props
6. Handle loading and error states

#### API Integration

1. Create service file in `src/lib/api/[feature].service.ts`
2. Use axios instance from `src/lib/api/axios.ts`
3. Create context provider for state management
4. Use TanStack Query in context for data fetching
5. Add proper TypeScript types for API responses
6. Handle authentication with existing interceptors

### Performance Optimization

- **Vite Build** : Fast builds with SWC for optimal performance
- **Code Splitting** : Vite handles automatic code splitting
- **Caching** : TanStack Query provides automatic caching
- **React Query** : Efficient server state management
- **Lazy Loading** : Load heavy components on demand
- **Memoization** : Use React.memo and useMemo for expensive operations

## 📊 Dashboard Analytics

The admin dashboard provides comprehensive analytics including:

- **Production Metrics** : Track biochar production across all sites
- **Site Statistics** : Monitor site performance and status
- **User Activity** : View user engagement and activity levels
- **Recent Activities** : See latest system activities
- **Workflow Progress** : Track progress through the 5-stage production workflow
- **Data Visualization** : Charts powered by Recharts

## 🔐 Security Features

### Authentication & Authorization

- **JWT Authentication** : Secure token-based authentication
- **Role-Based Access Control** : Four role levels (Super Admin, Admin, Supervisor, CSI Manager)
- **Protected Routes** : ProtectedRoute wrapper for authenticated pages
- **RoleGate Component** : Fine-grained role-based access to specific features
- **Axios Interceptors** : Automatic token injection and refresh handling

### Data Protection

- **Input Validation** : Zod schema validation on all forms
- **Type Safety** : TypeScript provides compile-time type checking
- **API Security** : Axios interceptors for secure API communication
- **Environment Variables** : Sensitive configuration via .env files

## 🚀 Deployment

### Build Configuration

```bash
# Production build
yarn build

# Build with environment
VITE_APP_ENV=production yarn build

# Preview build locally
yarn preview
```

### Deployment Options

- **Vercel** : Recommended for React applications
- **Netlify** : Alternative static hosting option
- **AWS S3 + CloudFront** : Custom deployment with CDN
- **Azure Static Web Apps** : Microsoft cloud deployment

### Environment Setup

- Configure environment variables for production
- Set up proper domain and SSL certificates
- Configure CDN for optimal performance (especially for satellite imagery)
- Set up monitoring and error tracking (Sentry)
- Configure Mapbox for production
- Set up CSI API production credentials

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] API endpoints configured correctly
- [ ] Role-based access control verified
- [ ] All production workflows tested
- [ ] Mobile responsiveness tested
- [ ] Build succeeds without errors
- [ ] Type checking passes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** : `git checkout -b feature/amazing-feature`
3. **Make your changes** following our code guidelines
4. **Run quality checks** : `yarn typecheck && yarn lint`
5. **Test thoroughly** : Ensure responsive design and functionality
6. **Test CSI compliance** : Verify GPS precision, immutability indicators
7. **Commit your changes** : `git commit -m 'feat: add amazing feature'`
8. **Push to branch** : `git push origin feature/amazing-feature`
9. **Open a Pull Request** with detailed description

### Contribution Guidelines

- Follow React and TypeScript best practices
- Maintain consistent code style and formatting
- Add proper TypeScript types for new features
- Ensure accessibility compliance (WCAG 2.1 AA)
- Test across different browsers and screen sizes
- Follow brand guidelines for colors and fonts
- Verify CSI compliance for data displays
- Update documentation for significant changes
- Test with both admin and partner roles

## 🧪 Testing

### Manual Testing Checklist

#### Admin Dashboard

- [ ] Dashboard loads with analytics
- [ ] Charts render properly
- [ ] User management functions
- [ ] Admin management (Super Admin only)
- [ ] Site management works
- [ ] Kontiki management functional

#### Production Workflow

- [ ] Biomass sourcing tracking works
- [ ] Biochar production tracking works
- [ ] Biochar activation tracking works
- [ ] Biochar sampling tracking works
- [ ] Bulk density measurements work
- [ ] Data persists correctly

#### User Management

- [ ] Create users with roles
- [ ] Edit user information
- [ ] Assign users to sites
- [ ] Revoke user access
- [ ] Role-based permissions enforce correctly

#### Site Management

- [ ] Create new sites
- [ ] Edit site details
- [ ] View site information
- [ ] Assign users to sites
- [ ] Manage site folders and files

## 📞 Support & Contact

- **Technical Issues** : Create an issue in the repository
- **General Inquiries** : contact@greenerth.com
- **Documentation** : Check README.md and inline code comments

## 🎯 Current Features

### Implemented ✅

- ✅ Admin dashboard with analytics
- ✅ Role-based access control (4 roles)
- ✅ User and admin management
- ✅ Site management with file organization
- ✅ Kontiki (kiln) inventory management
- ✅ Shift management
- ✅ Complete 5-stage production workflow tracking:
  - Biomass Sourcing
  - Biochar Production
  - Biochar Activation
  - Biochar Sampling
  - Bulk Density Measurement
- ✅ CSI verified records access
- ✅ Profile and settings management
- ✅ Help and support resources

## 🙏 Acknowledgments

- **React Community** for excellent libraries and tools
- **Shadcn** for the beautiful component library
- **Radix UI** for accessible component primitives
- **Vercel** for Vite and modern build tools

## 📄 License

This project is proprietary and confidential. All rights reserved. Unauthorized copying, distribution, or use is strictly prohibited.

---

**Greenerth - Built with modern web technologies for biochar production management**
