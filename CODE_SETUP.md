# VOR Platform - Code Setup Guide

Complete setup and installation guide for Phase 1 and Phase 2 of the VOR Platform.

---

# Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (for Phase 2 database)
- Git

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Okoronkwo-David-Creator01/vor.git
cd vor
```

## 2. Install Dependencies

```bash
npm install
```

---

# Environment Configuration

## Phase 1 (MVP) - No Environment Variables Required

Phase 1 uses mock data and requires no external configuration.

## Phase 2 - Required Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/vor_db"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Payment Gateways
PAYSTACK_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
PAYSTACK_PUBLIC_KEY="pk_test_xxxxxxxxxxxxx"
FLUTTERWAVE_SECRET_KEY="FLWSECK_TEST_xxxxxxxxxxxxx"
FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST_xxxxxxxxxxxxx"

# Application
APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

# Database Setup (Phase 2)

## 1. Install Prisma CLI

```bash
npm install -g prisma
```

## 2. Generate Prisma Client

```bash
npx prisma generate
```

## 3. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

## 4. Seed Database (Optional)

```bash
npx prisma db seed
```

---

# Running the Application

## Development Mode

```bash
npm run dev
```

The application will be available at: http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

---

# Phase 1 Features (MVP)

Phase 1 is the foundation platform with the following features:

### Public Platform
- Modern institutional landing page
- Verified property showcase
- Investment opportunity sections
- Corporate information pages
- Transparency-focused user experience

### Land Marketplace (VOR Terrain)
- Property filtering
- Property detail pages
- Verification center
- Investment zones
- Documentation framework

### Construction Marketplace (VOR Home & Construct)
- Housing marketplace
- Construction services portal
- Project showcase
- Client dashboard foundation

### Investor Portal (VOR Finance)
- Funding opportunities
- Investor information
- Financial reporting framework
- Capital allocation structure

### Corporate Platform
- Governance pages
- Compliance information
- Investor relations
- Fraud prevention center
- Careers and partnerships

**Access URLs:**
- Home: http://localhost:3000
- Terrain: http://localhost:3000/terrain
- Home & Construct: http://localhost:3000/home-construct
- Finance: http://localhost:3000/finance
- Corporate: http://localhost:3000/corporate

---

# Phase 2 Features (Operational Expansion)

Phase 2 adds comprehensive dashboard systems with role-based access control:

### Authentication & Authorization
- Enhanced authentication with MFA-ready architecture
- Session tracking and management
- Audit logging
- Role-Based Access Control (RBAC) with 9 roles:
  - Super Admin
  - Admin
  - Client
  - Investor
  - Contractor
  - Survey Officer
  - Legal Officer
  - Finance Officer
  - Sales Officer

### Dashboard Modules

#### 1. Client Dashboard
- Overview with key statistics
- Property Portfolio management
- Payment Center
- Document Vault
- Support Center

**Access:** http://localhost:3000/dashboard/client

#### 2. Investor Portal
- Dashboard Overview
- Investment Marketplace
- Portfolio Management
- Investment Reports

**Access:** http://localhost:3000/dashboard/investor

#### 3. Construction Management System
- Dashboard Overview
- Project Management
- Deliverables Management
- Media Uploads
- Approval Requests

**Access:** http://localhost:3000/dashboard/contractor

#### 4. Payment Infrastructure
- Finance Officer Dashboard
- Transaction Management
- Invoice Management
- Financial Reports
- Paystack/Flutterwave Integration

**Access:** http://localhost:3000/dashboard/finance-officer

#### 5. Legal & Verification Center
- Dashboard Overview
- Verification Requests Management
- Legal Documents Management
- Compliance Tracking

**Access:** http://localhost:3000/dashboard/legal

### API Endpoints

All API endpoints require authentication and permission checks:

- `GET /api/client/dashboard` - Client dashboard data
- `GET /api/investor/dashboard` - Investor dashboard data
- `GET /api/contractor/dashboard` - Contractor dashboard data
- `GET /api/finance/dashboard` - Finance Officer dashboard data
- `GET /api/legal/dashboard` - Legal dashboard data

### Security Features

- Rate limiting (API: 100/15min, Auth: 5/15min, Upload: 20/hour, Payment: 10/hour)
- Input validation (email, phone, password, file types)
- Error monitoring and logging
- Secure file access controls

---

# Account Creation & User Roles

## Phase 1 (MVP)
No account creation required. Phase 1 is a public-facing platform with mock data.

## Phase 2 (Operational Expansion)

### User Registration
Account creation is handled through the authentication system. Users can register with:
- Email and password
- Phone number (Nigerian format)
- Role assignment (by admin)

### Role-Based Access

Different roles have different dashboard access:

| Role | Dashboard Access | Key Permissions |
|------|------------------|-----------------|
| Super Admin | All dashboards | Full system access |
| Admin | All dashboards | Administrative functions |
| Client | Client Dashboard | View own properties, payments, documents |
| Investor | Investor Portal | Manage investments, view reports |
| Contractor | Contractor Workspace | Manage projects, deliverables |
| Survey Officer | Legal Dashboard | Verify properties, review documents |
| Legal Officer | Legal Dashboard | Review verifications, manage compliance |
| Finance Officer | Finance Dashboard | Process payments, manage invoices |
| Sales Officer | (Not implemented in Phase 2) | CRM functions |

### Permission System

Permissions are defined in `src/lib/auth/permissions.ts` and include:
- User Management
- Property Management
- Investment Management
- Payment Management
- Construction Management
- Document Management
- Verification Management
- CRM Management
- Support Management
- Analytics
- System Administration

---

# File Structure

## Phase 1 Structure
```
src/
├── app/
│   ├── terrain/
│   ├── home-construct/
│   ├── finance/
│   ├── corporate/
│   └── admin/
├── components/
│   ├── layout/
│   ├── ui/
│   ├── terrain/
│   ├── properties/
│   └── corporate/
└── lib/
    ├── data/
    ├── types/
    ├── constants/
    └── utils/
```

## Phase 2 Extended Structure
```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── client/
│   │   ├── investor/
│   │   ├── contractor/
│   │   ├── finance-officer/
│   │   └── legal/
│   ├── api/
│   │   ├── client/
│   │   ├── investor/
│   │   ├── contractor/
│   │   ├── finance/
│   │   └── legal/
├── lib/
│   ├── auth/
│   │   ├── permissions.ts
│   │   ├── middleware.ts
│   │   ├── config.ts
│   │   └── session.ts
│   ├── services/
│   │   └── payment.service.ts
│   ├── security/
│   │   ├── rate-limiter.ts
│   │   ├── validation.ts
│   │   ├── error-monitoring.ts
│   │   └── file-access.ts
│   └── types/
│       └── auth.types.ts
└── prisma/
    └── schema.prisma
```

---

# Troubleshooting

## Build Errors

### Route Conflict Error
**Error:** "You cannot have two parallel pages that resolve to the same path"

**Solution:** This was resolved by renaming the Phase 2 finance dashboard from `finance` to `finance-officer` to avoid conflict with the Phase 1 finance page.

### Permission Errors
**Error:** "Permission check failed"

**Solution:** Ensure the permission constant exists in `src/lib/auth/permissions.ts` and is assigned to the correct role.

## Database Issues

### Connection Error
**Error:** "Can't reach database server"

**Solution:** 
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in `.env.local`
3. Verify database exists

### Migration Issues
**Error:** "Migration failed"

**Solution:**
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

## Development Issues

### Port Already in Use
**Error:** "Port 3000 is already in use"

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Module Not Found
**Error:** "Module not found"

**Solution:**
```bash
npm install
```

---

# Linting

```bash
npm run lint
```

---

# Type Checking

```bash
npx tsc --noEmit
```

---

# Testing

Phase 1 and Phase 2 currently use mock data. Integration tests should be added for:
- API endpoints
- Authentication flows
- Permission checks
- Database operations

---

# Deployment

## Environment Setup

1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Build the application
5. Deploy to hosting platform

## Production Build

```bash
npm run build
npm start
```

---

# Support

For issues or questions:
1. Check the Errors & Solutions README
2. Review the Phase 2 Architecture documentation
3. Check the main README for project overview

---

# Next Steps

After completing Phase 2 setup, the platform is ready for:
- Backend integration with real database
- Payment gateway integration
- Email notifications
- File upload functionality
- Phase 3 development (Financial Infrastructure)
