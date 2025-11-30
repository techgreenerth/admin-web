# Tech Greenerth - Admin & Partner Portal

**Tech Greenerth Admin & Partner Portal** is a comprehensive React-based web application that provides powerful management, verification, and analytics tools for the biochar carbon credit platform. Built with modern web technologies, it offers real-time monitoring, batch verification, partner management, and compliance oversight features for Carbon Standards International (CSI) Global C-Sink Standards.

## 🚀 Project Overview

This is the **unified web portal** for the **Tech Greenerth Biochar Platform** ecosystem which serves:

- **Admin Dashboard** - Complete platform management, verification, and oversight
- **Partner Portal** - Multi-site management, training, and production tracking
- **Verifier Tools** - VVB (Validation and Verification Body) access and tools
- **Analytics & Reporting** - Real-time insights and CSI-compliant reporting

## ✨ Key Features

### 🔐 Role-Based Access Control

- **Admin Users** - Full platform access, verification, and configuration
- **Partner Organizations** - Multi-site management and production oversight
- **Verifier (VVB)** - Batch verification and CSI compliance validation
- **Site Managers** - Individual site-level management
- **Auditors** - Read-only access for compliance audits

### 👥 User & Entity Management

#### Admin Functions

- **Artisan Pro profiles** with proficiency test tracking and certification
- **C-Sink Cook profiles** with field GPS coordinates and harvest data
- **Partner organization management** with multi-site hierarchies
- **Kiln inventory** and assignment tracking
- **Biomass profile management** with lab reports and carbon content
- **Technology profiles** with methane emission factors
- **User activity monitoring** and comprehensive audit trails

#### Partner Functions

- **Multi-site dashboard** with production overview
- **Artisan Pro management** within partner organization
- **Kiln assignment** and tracking per site
- **Site boundary mapping** with GPS coordinates
- **Training module access** and completion tracking
- **Document repository** (videos, labor lists, payment records)

### 🌾 Production Management

#### Biomass Sourcing

- **Trip-by-trip tracking** with GPS-tagged photos
- **Delivery log** with tractor identification
- **GPS verification** with map view
- **Photo evidence gallery** with metadata

#### Biochar Production Dashboard

- **Batch tracking** with unique identifiers
- **5-step production workflow** visualization
- **Multi-kiln production** support per batch
- **Production timeline** with milestone tracking
- **AI volume estimation** display and validation
- **Moisture reading** logs per kiln
- **Photo verification** at each production stage
- **Production capacity** vs. actual output analysis

#### Biochar Activation

- **Bio-agent tracking** with volume records
- **Video verification** of activation process
- **Batch quantity** documentation
- **Agent inventory management**

#### Quality Control

- **Weekly sampling** documentation
- **Retention sample** photo gallery
- **Lab report management** and uploads
- **Quality metrics** dashboard (carbon content, H/C ratio)

#### Bulk Density Measurements

- **Sample tracking** with calculated density
- **Weight measurement** video verification
- **Density calculation** display with formulas
- **Historical measurements** and trends

### 🔍 Batch Verification & Approval

#### Admin Verification Workflow

- **Comprehensive batch dashboard** with filters (pending, approved, rejected)
- **Individual batch detail view** with complete evidence trail
- **Visual verification timeline** showing all 5 production steps
- **Evidence review interface** with photo/video viewer
- **AI estimation review** with confidence scores and manual override
- **Data validation** against CSI standards (GPS precision, carbon content, H/C ratio)
- **Admin approval workflow** with rejection reason documentation
- **Immutable audit trail** after approval
- **Batch status tracking** (Draft → Pending → Verified → Submitted to CSI)

#### Verifier (VVB) Tools

- **Dedicated verifier dashboard** with pending verification queue
- **Deeplink access** to batch details from dMRV
- **Evidence package review** (photos, videos, calculations)
- **Compliance checklist** against CSI standards
- **Batch bundling validation** for C-Sink Units
- **Verification report generation** with digital signatures
- **Direct submission** to CSI Global C-Sink Tool

### 📊 Carbon Credit Management

#### Carbon Credit Ledger

- **Immutable credit log** with blockchain-style tracking
- **Stock ID management** and assignment
- **C-Sink Unit bundling** per CSI requirements
- **Credit lifecycle tracking** (Stock → Sink → Issued → Retired)
- **Advanced search and filtering** by date, project, producer, matrix
- **Credit portfolio** visualization by project and partner
- **Automated calculations** :
- Biochar volume from AI estimates
- Biochar weight from bulk density
- Carbon content validation
- Emissions deductions
- Net carbon credits (tCO2e)

#### CSI Integration Dashboard

- **Real-time CSI Tool sync** status
- **STOCK transaction** submission tracking
- **SINK transaction** submission tracking
- **Excel bulk upload** generation for CSI
- **Monitoring report** generation (PDF with annexes)
- **Certificate management** (Artisan C-Sink Manager, C-Sink Potential Attestation)
- **Deeplink URL generation** for VVB access

### 🗺️ Geospatial Management

- **Interactive site mapping** with satellite imagery
- **Field boundary visualization** with GPS polygons
- **Production site plotting** on global map
- **GPS coordinate validation** (5 decimal precision enforcement)
- **Distance calculations** for transportation emissions
- **Matrix classification** visualization by region
- **Crop rotation tracking** per field
- **Biomass sourcing** radius analysis

### 📈 Analytics & Reporting

#### Admin Analytics

- **KPI widgets** (carbon credits generated, biochar produced, biomass processed)
- **Global statistics** dashboard
- **Production trends** (daily, weekly, monthly)
- **Partner performance** comparison
- **Artisan Pro productivity** rankings
- **Quality control metrics** and anomaly detection
- **Emissions portfolio** visualization
- **Revenue projections** and carbon credit forecasting
- **AI model performance** tracking (accuracy, confidence scores)

#### Partner Analytics

- **Multi-site production overview** with aggregate metrics
- **Site-level performance** dashboards
- **Artisan Pro productivity** per site
- **Production volume** by time period
- **Carbon credit allocation** by site
- **Training completion rates**
- **Quality control compliance** scores

#### Reporting & Exports

- **Flexible data selection** with custom date ranges
- **CSV export** for raw data analysis
- **PDF report generation** with branding
- **Excel bulk uploads** for CSI submission
- **Audit-ready formatting** with complete evidence packages
- **Monitoring reports** (CSI-compliant PDF with annexes)
- **Automated report scheduling** and email delivery

### 🎯 Partner Management Portal

#### Onboarding & Configuration

- **Partner onboarding system** with document verification
- **Organization hierarchy** setup (partner → sites → artisans)
- **Access control** and user role assignment
- **Kiln inventory** allocation per site
- **Training module** assignment and tracking

#### Site Management

- **Multi-site dashboard** with production visualization
- **Individual site detail pages** with GPS mapping
- **Artisan Pro assignment** and performance tracking
- **Kiln assignment** and utilization rates
- **Site-level analytics** and reporting

#### Training & Compliance

- **Training module library** (video content, PDFs, quizzes)
- **Progress tracking** per artisan and site
- **Certification management** and expiry tracking
- **Proficiency test** administration and results
- **Compliance monitoring** against CSI standards

#### Document Management

- **Document upload system** (site videos, training materials, labor lists)
- **Payment record management**
- **Contract document** storage and versioning
- **Lab report repository**
- **Certificate archive**

#### Invoice & Payment Management

- **Invoice generation** with customizable templates
- **Payment tracking** and reconciliation
- **Financial analytics** by partner and site
- **Automated payment reminders**
- **Transaction history** with detailed records

### 🔧 Platform Administration

#### System Configuration

- **Emission factors table** with sources and CSI approval status
- **Calculation formulas** (admin-configurable)
- **Margin of security** settings per project
- **Matrix list** management (permissible matrices)
- **Default values** configuration (bulk density, carbon content)
- **Feature toggles** for gradual rollout

#### Content Management

- **Training content** upload and organization
- **App notifications** configuration
- **Email templates** management
- **SMS templates** for field workers
- **Announcement system** for partners and artisans

#### AI/ML Model Management

- **Model version tracking** and deployment
- **Accuracy monitoring** and performance metrics
- **Confidence threshold** configuration
- **Manual override** tracking and analysis
- **Model retraining** scheduling and data preparation

#### API & Integration Monitoring

- **CSI Global C-Sink Tool** connection status
- **ML service** health checks
- **Mobile app sync** queue monitoring
- **Database performance** metrics
- **Error logs** and debugging tools

### 📱 Real-Time Features

- **Production notifications** (batch completion, verification needed)
- **Sync status updates** for offline mobile data
- **AI estimation completion** alerts
- **Verification approval** notifications
- **CSI submission** status updates
- **Admin alerts** for anomalies or compliance issues

## 🛠 Tech Stack

### Core Framework

- **React** `^18.2.0` - Modern React with hooks and concurrent features
- **TypeScript** `^5.3.3` - Type-safe JavaScript development
- **Vite** `^4.2.0` - Fast build tool and development server

### UI & Design System

- **Radix UI** - Headless, accessible UI components
  - `@radix-ui/react-dialog: ^1.1.13` - Modal dialogs
  - `@radix-ui/react-dropdown-menu: ^2.1.4` - Dropdown menus
  - `@radix-ui/react-tabs: ^1.1.2` - Tab navigation
  - `@radix-ui/react-select: ^2.1.4` - Select components
  - `@radix-ui/react-accordion: ^1.2.3` - Accordion components
  - `@radix-ui/react-tooltip: ^1.1.8` - Tooltips
- **Tailwind CSS** `^3.3.1` - Utility-first CSS framework
- **Lucide React** (`lucide-react: ^0.277.0`) - Modern icon library
- **Class Variance Authority** (`class-variance-authority: ^0.7.0`) - CSS-in-JS utilities
- **Brand Colors** : #295F58, #E1EFEE, #D0F07B, #D6E5AB, #FFFDF0 (per brand guidelines)

### State Management

- **Redux Toolkit** (`@reduxjs/toolkit: ^2.8.2`) - Modern Redux state management
- **React Redux** (`react-redux: ^9.2.0`) - React bindings for Redux
- **Redux Persist** (`redux-persist: ^6.0.0`) - State persistence

### Data Fetching & API

- **TanStack Query** (`@tanstack/react-query: ^4.29.3`) - Server state management
- **Axios** (`axios: ^1.7.9`) - HTTP client for API requests
- **React Hook Form** (`react-hook-form: ^7.54.2`) - Form management
- **Hookform Resolvers** (`@hookform/resolvers: ^3.9.1`) - Form validation
- **Zod** (`zod: ^3.24.1`) - TypeScript-first schema validation

### Routing & Navigation

- **React Router DOM** (`react-router-dom: ^6.10.0`) - Client-side routing
- **Loadable Component** (`@loadable/component: ^5.15.3`) - Code splitting

### Data Visualization & Charts

- **Recharts** (`recharts: ^2.15.0`) - React charting library for analytics
- **React Charts** - Production trends and carbon credit visualization
- **ApexCharts** (`apexcharts: ^3.45.0`) - Advanced interactive charts
- **D3.js** (`d3: ^7.8.5`) - Custom data visualizations

### Mapping & Geospatial

- **Mapbox GL** (`mapbox-gl: ^3.0.1`) - Interactive maps with satellite imagery
- **React Map GL** (`react-map-gl: ^7.1.6`) - React wrapper for Mapbox
- **Turf.js** (`@turf/turf: ^7.2.0`) - Geospatial analysis and calculations

### Document Processing

- **React PDF** (`@react-pdf/renderer: ^3.1.14`) - PDF generation
- **XLSX** (`xlsx: ^0.18.5`) - Excel file processing and bulk uploads
- **PapaParse** (`papaparse: ^5.5.2`) - CSV parsing and export
- **jsPDF** (`jspdf: ^2.5.2`) - Additional PDF generation

### Media & File Handling

- **React Dropzone** (`react-dropzone: ^14.2.3`) - File upload interface
- **React Image Gallery** (`react-image-gallery: ^1.3.0`) - Photo evidence viewer
- **React Player** (`react-player: ^2.13.0`) - Video player for verification

### Internationalization

- **i18next** (`i18next: ^23.5.1`) - Internationalization framework
- **React i18next** (`react-i18next: ^13.2.2`) - React bindings for i18next
- **i18next Browser Language Detector** - Automatic language detection

### Development Tools

- **ESLint** (`eslint: ^8.38.0`) - Code linting
- **Prettier** (`prettier: ^2.8.8`) - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Stylelint** (`stylelint: ^15.4.0`) - CSS linting
- **Husky** (`husky: ^8.0.3`) - Git hooks
- **Lint Staged** (`lint-staged: ^13.2.1`) - Pre-commit linting

### Utilities

- **Date-fns** (`date-fns: ^4.1.0`) - Date manipulation library
- **clsx** (`clsx: ^2.0.0`) - Conditional CSS classes
- **Lodash** (`lodash: ^4.17.21`) - Utility functions
- **React Hot Toast** (`react-hot-toast: ^2.4.1`) - Toast notifications
- **React Markdown** (`react-markdown: ^9.0.1`) - Markdown rendering

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** `>=18.0.0`
- **npm** , **yarn** , or **pnpm**
- **Git** for version control

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tech-greenerth/admin-web
```

### 2. Install Dependencies

```bash
# Using yarn (recommended)
yarn install

# Using npm
npm install

# Using pnpm
pnpm install
```

### 3. Environment Configuration

Create `.env` file with required variables:

```bash
# API Configuration
VITE_API_BASE_URL="http://localhost:3000/api"
VITE_ML_API_URL="http://localhost:8000"
VITE_APP_ENV="development"

# Authentication
VITE_JWT_SECRET="your-jwt-secret"

# Firebase Configuration
VITE_FIREBASE_API_KEY="your-firebase-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-firebase-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"

# Mapbox Configuration
VITE_MAPBOX_ACCESS_TOKEN="your-mapbox-token"

# CSI Integration
VITE_CSI_API_URL="https://api.carbon-standards.com"
VITE_CSI_STAG_URL="https://stag.carbon-standards.com"
VITE_CSI_PROD_URL="https://prod.carbon-standards.com"

# AWS S3 Configuration (for media access)
VITE_AWS_S3_BUCKET_URL="https://tech-greenerth-media.s3.amazonaws.com"

# Analytics
VITE_GOOGLE_ANALYTICS_ID="your-ga-id"
VITE_SENTRY_DSN="your-sentry-dsn"

# Feature Flags
VITE_ENABLE_AI_OVERRIDE="true"
VITE_ENABLE_BLOCKCHAIN="false"
VITE_ENABLE_ADVANCED_ANALYTICS="true"

# CSI Compliance Settings
VITE_MIN_GPS_PRECISION=5
VITE_MIN_C_SINK_UNIT=1
VITE_MARGIN_OF_SECURITY=0.1
```

### 4. Run the Application

#### Development

```bash
# Start development server
yarn dev
# or
npm run dev

# Runs on http://localhost:5173
```

#### Build for Production

```bash
# Build the application
yarn build
# or
npm run build
```

#### Preview Production Build

```bash
# Preview production build locally
yarn preview
# or
npm run preview
```

### 5. Development Tools

#### Type Checking

```bash
# Run TypeScript type checking
yarn typecheck
# or
npm run typecheck

# Watch mode for continuous type checking
yarn typecheck:watch
# or
npm run typecheck:watch
```

#### Code Quality

```bash
# Run linting
yarn lint
# or
npm run lint

# Fix linting issues
yarn lint:fix
# or
npm run lint:fix

# Format code with Prettier
yarn format
# or
npm run format
```

#### Testing

```bash
# Run unit tests
yarn test
# or
npm run test

# Run tests with coverage
yarn test:coverage
# or
npm run test:coverage
```

## 📁 Project Architecture

The web portal follows **feature-based architecture** with **component-driven development** principles, organized by user role and functionality.

```text
src/
├── app.tsx                          # Main App component
├── main.tsx                         # Application entry point
├── vite-env.d.ts                    # Vite environment types
│
├── assets/                          # Static assets
│   ├── logo.png                     # Application logo (per brand guidelines)
│   ├── icons/                       # Custom SVG icons
│   └── images/                      # Static images
│
├── components/                      # Reusable UI components
│   ├── ui/                          # Base UI components (Radix wrappers)
│   │   ├── button.tsx               # Button component
│   │   ├── dialog.tsx               # Modal dialog
│   │   ├── dropdown.tsx             # Dropdown menu
│   │   ├── tabs.tsx                 # Tab navigation
│   │   ├── select.tsx               # Select component
│   │   ├── input.tsx                # Input field
│   │   ├── card.tsx                 # Card container
│   │   └── tooltip.tsx              # Tooltip component
│   ├── layout/                      # Layout components
│   │   ├── header.tsx               # Application header
│   │   ├── sidebar.tsx              # Navigation sidebar
│   │   ├── footer.tsx               # Application footer
│   │   └── page-layout.tsx          # Page wrapper
│   ├── charts/                      # Chart components
│   │   ├── production-chart.tsx     # Production trends
│   │   ├── carbon-credit-chart.tsx  # Carbon credit visualization
│   │   └── emissions-chart.tsx      # Emissions portfolio
│   ├── maps/                        # Map components
│   │   ├── site-map.tsx             # Interactive site map
│   │   ├── field-boundary-map.tsx   # Field boundaries
│   │   └── global-map.tsx           # Global production sites
│   └── shared/                      # Shared components
│       ├── loading-spinner.tsx      # Loading states
│       ├── error-boundary.tsx       # Error handling
│       ├── data-table.tsx           # Reusable data tables
│       ├── photo-viewer.tsx         # Photo evidence viewer
│       ├── video-player.tsx         # Video verification player
│       └── gps-display.tsx          # GPS coordinate display
│
├── contexts/                        # React contexts
│   ├── auth-context.tsx             # Authentication context
│   ├── theme-context.tsx            # Theme provider
│   └── user-context.tsx             # User role and permissions
│
├── hooks/                           # Custom React hooks
│   ├── auth/                        # Authentication hooks
│   │   ├── use-auth.tsx             # Auth state and actions
│   │   └── use-permissions.tsx      # Role-based permissions
│   ├── admin/                       # Admin-specific hooks
│   │   ├── use-batch-verification.tsx
│   │   ├── use-carbon-ledger.tsx
│   │   ├── use-artisan-management.tsx
│   │   └── use-csi-integration.tsx
│   ├── partner/                     # Partner-specific hooks
│   │   ├── use-partner-dashboard.tsx
│   │   ├── use-site-management.tsx
│   │   ├── use-training-modules.tsx
│   │   └── use-invoice-management.tsx
│   ├── production/                  # Production data hooks
│   │   ├── use-biomass-sourcing.tsx
│   │   ├── use-biochar-production.tsx
│   │   ├── use-activation.tsx
│   │   ├── use-sampling.tsx
│   │   └── use-bulk-density.tsx
│   ├── analytics/                   # Analytics hooks
│   │   ├── use-dashboard-analytics.tsx
│   │   ├── use-production-metrics.tsx
│   │   └── use-carbon-credit-analytics.tsx
│   ├── geospatial/                  # Geospatial hooks
│   │   ├── use-site-mapping.tsx
│   │   └── use-gps-validation.tsx
│   └── common/                      # Common utility hooks
│       ├── use-toast.tsx            # Toast notifications
│       ├── use-debounce.tsx         # Input debouncing
│       └── use-pagination.tsx       # Pagination logic
│
├── lib/                             # Utilities and services
│   ├── api/                         # API client configuration
│   │   ├── axios.ts                 # Axios instance
│   │   ├── endpoints.ts             # API endpoints
│   │   └── interceptors.ts          # Request/response interceptors
│   ├── utils/                       # Utility functions
│   │   ├── date-utils.ts            # Date formatting
│   │   ├── gps-utils.ts             # GPS validation and formatting
│   │   ├── calculation-utils.ts     # Carbon credit calculations
│   │   ├── validation-utils.ts      # Data validation
│   │   └── export-utils.ts          # CSV/Excel export
│   ├── constants/                   # Application constants
│   │   ├── csi-standards.ts         # CSI standard values
│   │   ├── emission-factors.ts      # Emission factors table
│   │   ├── routes.ts                # Route definitions
│   │   └── colors.ts                # Brand color palette
│   └── services/                    # Business logic services
│       ├── csi-service.ts           # CSI integration
│       ├── pdf-service.ts           # PDF generation
│       └── excel-service.ts         # Excel bulk uploads
│
├── pages/                           # Page components (route-based)
│   ├── auth/                        # Authentication pages
│   │   ├── login.tsx                # Login page
│   │   ├── register.tsx             # Registration page
│   │   └── forgot-password.tsx      # Password reset
│   │
│   ├── admin/                       # Admin pages
│   │   ├── dashboard/               # Admin dashboard
│   │   │   └── index.tsx            # Main dashboard with KPIs
│   │   ├── verification/            # Batch verification
│   │   │   ├── pending-batches.tsx  # Pending verification queue
│   │   │   ├── batch-detail.tsx     # Individual batch review
│   │   │   └── verification-history.tsx
│   │   ├── carbon-ledger/           # Carbon credit management
│   │   │   ├── index.tsx            # Credit ledger dashboard
│   │   │   ├── stock-transactions.tsx
│   │   │   └── sink-transactions.tsx
│   │   ├── users/                   # User management
│   │   │   ├── artisan-pros.tsx     # Artisan Pro management
│   │   │   ├── partners.tsx         # Partner organizations
│   │   │   ├── admins.tsx           # Admin users
│   │   │   └── user-detail.tsx      # User profile view
│   │   ├── entities/                # Entity management
│   │   │   ├── kilns.tsx            # Kiln inventory
│   │   │   ├── biomass-profiles.tsx # Biomass profiles
│   │   │   ├── sites.tsx            # Site management
│   │   │   └── fields.tsx           # Field mapping
│   │   ├── production/              # Production oversight
│   │   │   ├── biomass-deliveries.tsx
│   │   │   ├── production-batches.tsx
│   │   │   ├── activation-records.tsx
│   │   │   ├── samples.tsx
│   │   │   └── bulk-density.tsx
│   │   ├── csi-integration/         # CSI tool integration
│   │   │   ├── submission-queue.tsx # Pending CSI submissions
│   │   │   ├── sync-status.tsx      # Sync status monitoring
│   │   │   └── certificates.tsx     # Certificate management
│   │   ├── analytics/               # Advanced analytics
│   │   │   ├── production-analytics.tsx
│   │   │   ├── quality-control.tsx
│   │   │   ├── partner-performance.tsx
│   │   │   └── ml-performance.tsx   # AI model analytics
│   │   ├── reports/                 # Report generation
│   │   │   ├── monitoring-reports.tsx
│   │   │   ├── audit-reports.tsx
│   │   │   └── custom-reports.tsx
│   │   └── settings/                # System settings
│   │       ├── emission-factors.tsx # Emission factors table
│   │       ├── formulas.tsx         # Calculation formulas
│   │       ├── matrix-list.tsx      # Matrix management
│   │       └── feature-flags.tsx    # Feature toggles
│   │
│   ├── partner/                     # Partner portal pages
│   │   ├── dashboard/               # Partner dashboard
│   │   │   └── index.tsx            # Multi-site overview
│   │   ├── sites/                   # Site management
│   │   │   ├── site-list.tsx        # All sites
│   │   │   ├── site-detail.tsx      # Individual site
│   │   │   └── site-analytics.tsx   # Site-level analytics
│   │   ├── artisans/                # Artisan Pro management
│   │   │   ├── artisan-list.tsx     # All artisans
│   │   │   ├── artisan-detail.tsx   # Artisan profile
│   │   │   └── performance.tsx      # Performance tracking
│   │   ├── production/              # Production tracking
│   │   │   ├── production-overview.tsx
│   │   │   ├── batch-tracking.tsx
│   │   │   └── quality-metrics.tsx
│   │   ├── training/                # Training management
│   │   │   ├── module-library.tsx   # Training modules
│   │   │   ├── progress-tracking.tsx
│   │   │   └── certificates.tsx     # Certification tracking
│   │   ├── documents/               # Document management
│   │   │   ├── document-repository.tsx
│   │   │   ├── lab-reports.tsx
│   │   │   └── contracts.tsx
│   │   ├── invoices/                # Invoice management
│   │   │   ├── invoice-list.tsx
│   │   │   ├── create-invoice.tsx
│   │   │   └── payment-tracking.tsx
│   │   └── analytics/               # Partner analytics
│   │       ├── production-metrics.tsx
│   │       └── carbon-credits.tsx
│   │
│   ├── verifier/                    # Verifier (VVB) pages
│   │   ├── dashboard.tsx            # Verifier dashboard
│   │   ├── verification-queue.tsx   # Pending verifications
│   │   ├── batch-review.tsx         # Detailed batch review
│   │   └── compliance-checklist.tsx # CSI compliance check
│   │
│   └── shared/                      # Shared pages
│       ├── profile.tsx              # User profile
│       ├── notifications.tsx        # Notification center
│       └── help.tsx                 # Help and documentation
│
├── redux/                           # State management
│   ├── store.ts                     # Redux store configuration
│   ├── slices/                      # Redux slices
│   │   ├── auth-slice.ts            # Authentication state
│   │   ├── user-slice.ts            # User data
│   │   ├── batch-slice.ts           # Batch data
│   │   └── carbon-ledger-slice.ts   # Carbon credit state
│   └── middleware/                  # Redux middleware
│       └── api-middleware.ts        # API call middleware
│
├── router.tsx                       # Application routing
│   ├── admin-routes.tsx             # Admin route guards
│   ├── partner-routes.tsx           # Partner route guards
│   └── verifier-routes.tsx          # Verifier route guards
│
├── styles/                          # Global styles
│   ├── globals.css                  # Global CSS
│   ├── tailwind.css                 # Tailwind directives
│   └── brand-colors.css             # Brand color variables
│
└── types/                           # TypeScript type definitions
    ├── api.types.ts                 # API response types
    ├── user.types.ts                # User and role types
    ├── production.types.ts          # Production data types
    ├── carbon-credit.types.ts       # Carbon credit types
    ├── csi.types.ts                 # CSI integration types
    └── geospatial.types.ts          # GPS and mapping types
```

### Key Architecture Patterns

- **Component-Based Architecture** : Modular, reusable UI components
- **Feature-Based Organization** : Code organized by admin/partner domains
- **Custom Hooks Pattern** : Business logic abstraction with React hooks
- **Role-Based Routing** : Protected routes based on user permissions
- **Context API** : Global state for auth and theme
- **Redux Toolkit** : Complex state management for production data
- **Type-Safe Development** : Comprehensive TypeScript integration

## 🎨 Design System

### Brand Guidelines

- **Font Family** : Arial (per brand guidelines)
- **Color Palette** :
- Primary: #295F58
- Secondary: #E1EFEE
- Accent 1: #D0F07B
- Accent 2: #D6E5AB
- Background: #FFFDF0

### Component Library

- **Radix UI Primitives** : Headless, accessible components
- **Custom Components** : Built on Radix with brand styling
- **Consistent Styling** : Tailwind CSS with brand color palette
- **Dark/Light Themes** : Optional theme switching

### Styling Approach

- **Tailwind CSS** : Utility-first styling approach
- **Component Variants** : Consistent component styling with CVA
- **Responsive Design** : Mobile-first responsive layouts (tablets and desktop)
- **Accessibility** : WCAG 2.1 AA compliant components

## 🚦 Development Guidelines

### Getting Started for New Developers

1. **Understand CSI Standards** : Review Global C-Sink Standards documentation
2. **Study the 5 Modules** : Understand biochar production workflow
3. **Review Component Library** : Examine existing UI components and patterns
4. **Study API Integration** : Look at existing hooks and API client setup
5. **Understand Role-Based Access** : Learn admin vs. partner permissions
6. **Follow React Patterns** : Use hooks, context, and modern React patterns
7. **Test GPS Features** : Understand 5 decimal precision requirements

### Code Style & Standards

- **TypeScript** : Use strict typing and proper interfaces
- **ESLint + Prettier** : Automated code formatting and linting
- **Component Naming** : Use PascalCase for components, camelCase for functions
- **File Organization** : Group related functionality in feature folders
- **Accessibility** : Use semantic HTML and ARIA attributes
- **Performance** : Implement lazy loading and code splitting
- **GPS Precision** : Always validate 5 decimal places in displays
- **Brand Colors** : Use brand color palette consistently

### Development Workflow

1. **Create Feature Branch** : `git checkout -b feature/module-name`
2. **Implement Changes** : Follow existing patterns and conventions
3. **Type Checking** : Run `yarn typecheck` to verify TypeScript
4. **Code Quality** : Run `yarn lint:fix` for code formatting
5. **Test Functionality** : Test in browser with different screen sizes
6. **CSI Compliance** : Verify data displays match CSI requirements
7. **Code Review** : Submit PR with clear description

### Common Development Tasks

#### Adding a New Admin Page

1. Create page component in `src/pages/admin/`
2. Add route configuration in `router.tsx`
3. Create necessary custom hooks in `src/hooks/admin/`
4. Add navigation links in sidebar
5. Update TypeScript types if required
6. Add role-based access control

#### Adding a New Partner Page

1. Create page component in `src/pages/partner/`
2. Add route with partner guard
3. Create partner-specific hooks
4. Add to partner navigation
5. Test with multi-site scenarios

#### Creating a New Chart/Visualization

1. Create chart component in `src/components/charts/`
2. Use Recharts or ApexCharts as base
3. Apply brand color palette
4. Add responsive behavior
5. Include loading and error states
6. Add TypeScript interfaces for data props

#### Adding Map Features

1. Create map component in `src/components/maps/`
2. Use Mapbox GL with brand styling
3. Validate GPS coordinates (5 decimal precision)
4. Add satellite imagery option
5. Include zoom and pan controls
6. Handle edge cases (no GPS data)

#### API Integration

1. Add API endpoints to `src/lib/api/endpoints.ts`
2. Create custom hooks in appropriate `src/hooks/` folder
3. Use TanStack Query for server state management
4. Handle loading and error states properly
5. Add proper TypeScript types for API responses
6. Implement optimistic updates where appropriate

### Performance Optimization

- **Code Splitting** : Use `@loadable/component` for route-based splitting
- **Image Optimization** : Optimize satellite imagery and photos
- **Bundle Analysis** : Monitor bundle size and optimize imports
- **Caching** : Implement proper caching with TanStack Query
- **Lazy Loading** : Load charts and maps on demand
- **Virtual Scrolling** : Use for large data tables (batch lists)
- **Memoization** : Memoize expensive calculations (carbon credits)

### CSI Compliance in UI

- **GPS Display** : Always show 5 decimal places (e.g., 14.12345/8.12345)
- **Timestamps** : Display in ISO format or localized format consistently
- **Carbon Content** : Show percentage with 2 decimal places (e.g., 71.30%)
- **H/C Ratio** : Display with validation indicators
- **Immutability** : Show clear indicators for locked/approved batches
- **Audit Trail** : Display complete history with timestamps and users
- **Validation Errors** : Show CSI-specific validation messages

## 📊 Analytics & Monitoring

### User Analytics

- **Google Analytics** : Page views and user behavior tracking
- **Custom Events** : Business-specific event tracking (batch approvals, CSI submissions)
- **Performance Monitoring** : Core Web Vitals and load times

### Error Tracking

- **Sentry Integration** : Production error monitoring
- **Error Boundaries** : React error boundary implementation
- **User Feedback** : Error reporting with context

### Dashboard Metrics

- **Production KPIs** : Batches verified, carbon credits generated
- **Partner Performance** : Multi-site production comparisons
- **AI Accuracy** : Volume estimation performance tracking
- **CSI Sync Status** : Real-time integration monitoring

## 🔐 Security Considerations

### Authentication & Authorization

- **JWT Token Management** : Secure token storage and refresh
- **Role-Based Access** : Proper permission checking (Admin/Partner/Verifier)
- **Route Guards** : Protected routes based on user roles
- **API Security** : Secure API communication with proper headers

### Data Protection

- **Input Validation** : Client-side and server-side validation
- **XSS Prevention** : Proper data sanitization
- **HTTPS** : All production traffic over HTTPS
- **CSI API Keys** : Secure storage of integration credentials

### Audit & Compliance

- **Action Logging** : Track all admin actions (approvals, rejections)
- **Immutability Display** : Show which records are locked
- **Verification Trail** : Complete evidence package access
- **Data Export Controls** : Limit sensitive data exports by role

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
- [ ] CSI integration tested in STAG environment
- [ ] GPS precision validation working (5 decimals)
- [ ] Brand colors applied throughout
- [ ] Map tiles and satellite imagery loading
- [ ] PDF/Excel generation tested
- [ ] Role-based access control verified
- [ ] Mobile responsiveness tested
- [ ] Error tracking configured
- [ ] Analytics configured

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

- [ ] KPI widgets display correct data
- [ ] Charts and graphs render properly
- [ ] Real-time updates work
- [ ] Batch verification workflow functions
- [ ] Carbon ledger calculations accurate
- [ ] CSV/PDF exports work
- [ ] Satellite maps load correctly

#### Partner Portal

- [ ] Multi-site dashboard works
- [ ] Site-level analytics display
- [ ] Training modules accessible
- [ ] Document uploads work
- [ ] Invoice generation functions
- [ ] Payment tracking accurate

#### Verification Workflow

- [ ] Evidence viewer displays photos/videos
- [ ] AI estimates show correctly
- [ ] Approval workflow functions
- [ ] Rejection reasons captured
- [ ] Deeplinks work for VVB
- [ ] CSI submission succeeds

#### Geospatial Features

- [ ] GPS coordinates validate (5 decimals)
- [ ] Field boundaries display correctly
- [ ] Satellite imagery loads
- [ ] Map zoom and pan work
- [ ] Site markers clickable
- [ ] Distance calculations accurate

## 📞 Support & Contact

- **Technical Issues** : Create an issue in the repository
- **CSI Compliance Questions** : contact@carbonstandardsinternational.org
- **General Inquiries** : support@techgreenerth.com
- **Documentation** : Check README.md and inline code comments

## 🎯 Roadmap

### Phase 1 (Current - 60 Days)

- ✅ Admin dashboard with batch verification
- ✅ Partner portal with multi-site management
- ✅ Carbon credit ledger
- ✅ CSI integration and reporting
- ✅ Geospatial mapping with satellite imagery
- ✅ AI volume estimation display

### Phase 2 (Future)

- [ ] Advanced analytics dashboards with predictive insights
- [ ] Mobile-responsive design optimization
- [ ] Blockchain integration for immutability
- [ ] Enhanced training module system with quizzes
- [ ] Automated CSI sync scheduling
- [ ] Multi-language support expansion
- [ ] Enhanced audit trail visualization

### Phase 3 (Future)

- [ ] IoT sensor data integration dashboards
- [ ] Drone imagery integration for field mapping
- [ ] Weather data overlay on maps
- [ ] Carbon credit marketplace integration
- [ ] Advanced ML model performance analytics
- [ ] Automated report scheduling and delivery
- [ ] Mobile app for field verifiers

## 🙏 Acknowledgments

- **Carbon Standards International** for Global C-Sink Standards
- **React Community** for excellent libraries and tools
- **Mapbox** for satellite imagery and mapping capabilities
- **Artisan Biochar Producers** for field testing and feedback
- **CSI Verification Bodies** for compliance guidance

## 📄 License

This project is proprietary and confidential. All rights reserved. Unauthorized copying, distribution, or use is strictly prohibited.

---

**Tech Greenerth - Built with ❤️ for carbon removal and climate action**
