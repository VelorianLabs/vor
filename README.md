# VOR Platform

**Vintage Outlook Realty (VOR)**

A trust-first PropTech and infrastructure platform built to transform real estate discovery, verification, development, and investment across Nigeria.

VOR combines land intelligence, property development, and investment opportunities into a transparent ecosystem where buyers, developers, and investors can make informed decisions with confidence.

---

## Vision

To become Africa's most trusted digital real estate and infrastructure ecosystem by combining transparency, technology, and verified property intelligence.

## Mission

To eliminate uncertainty in real estate transactions through verified data, trusted processes, responsible development, and accessible investment opportunities.

---

## Core Trust Principles

* ✅ Trust
* ✅ Transparency
* ✅ Verified Realty
* ✅ Compliance
* ✅ Long-Term Value Creation

---

# Business Divisions

## VOR Terrain

Land intelligence and acquisition platform focused on:

* Verified land listings
* Property verification
* GPS and survey intelligence
* Investment zone discovery
* Title documentation review

---

## VOR Home & Construct

Construction and property development division focused on:

* Residential development
* Construction services
* Housing marketplace
* Project management
* Property lifecycle solutions

---

## VOR Finance

Investment and funding division focused on:

* Project financing
* Investor relations
* Structured investment opportunities
* Development funding
* Financial reporting

---

# Technology Stack

| Layer          | Technology             |
| -------------- | ---------------------- |
| Framework      | Next.js 15             |
| Language       | TypeScript             |
| Styling        | Tailwind CSS           |
| Icons          | Lucide React           |
| Fonts          | DM Sans & Fraunces     |
| Architecture   | App Router             |
| Data Source    | Mock Data (MVP)        |
| API Layer      | Next.js Route Handlers |
| Future Backend | NestJS + PostgreSQL    |

---

# Current MVP Features

### Public Platform

* Modern institutional landing page
* Verified property showcase
* Investment opportunity sections
* Corporate information pages
* Transparency-focused user experience

### Land Marketplace

* Property filtering
* Property detail pages
* Verification center
* Investment zones
* Documentation framework

### Construction Marketplace

* Housing marketplace
* Construction services portal
* Project showcase
* Client dashboard foundation

### Investor Portal

* Funding opportunities
* Investor information
* Financial reporting framework
* Capital allocation structure

### Corporate Platform

* Governance pages
* Compliance information
* Investor relations
* Fraud prevention center
* Careers and partnerships

---

# Project Structure

## Phase 1 Structure

```text
src/
├── app/
│   ├── terrain/
│   ├── home-construct/
│   ├── finance/
│   ├── corporate/
│   ├── admin/
│   └── api/
│
├── components/
│   ├── layout/
│   ├── ui/
│   ├── terrain/
│   ├── properties/
│   ├── maps/
│   └── corporate/
│
└── lib/
    ├── data/
    ├── types/
    ├── constants/
    └── utils/
```

## Phase 2 Extended Structure

```text
src/
├── app/
│   ├── (dashboard)/
│   │   ├── client/              # Client Dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # Overview
│   │   │   ├── portfolio/       # Property Portfolio
│   │   │   ├── payments/        # Payment Center
│   │   │   ├── documents/       # Document Vault
│   │   │   └── support/         # Support Center
│   │   ├── investor/            # Investor Portal
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # Dashboard Overview
│   │   │   ├── marketplace/     # Investment Marketplace
│   │   │   ├── portfolio/       # Investment Portfolio
│   │   │   └── reports/         # Investment Reports
│   │   ├── contractor/          # Contractor Workspace
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # Dashboard Overview
│   │   │   ├── projects/        # Assigned Projects
│   │   │   ├── deliverables/    # Deliverables Management
│   │   │   ├── uploads/         # Media Uploads
│   │   │   └── requests/        # Approval Requests
│   │   ├── finance-officer/     # Finance Officer Dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # Dashboard Overview
│   │   │   ├── transactions/    # Transaction Management
│   │   │   ├── invoices/        # Invoice Management
│   │   │   └── reports/         # Financial Reports
│   │   └── legal/               # Legal & Verification Center
│   │       ├── layout.tsx
│   │       ├── page.tsx         # Dashboard Overview
│   │       ├── verifications/   # Verification Requests
│   │       ├── documents/       # Legal Documents
│   │       └── compliance/      # Compliance Tracking
│   ├── api/
│   │   ├── client/
│   │   │   └── dashboard/       # Client Dashboard API
│   │   ├── investor/
│   │   │   └── dashboard/       # Investor Dashboard API
│   │   ├── contractor/
│   │   │   └── dashboard/       # Contractor Dashboard API
│   │   ├── finance/
│   │   │   └── dashboard/       # Finance Dashboard API
│   │   └── legal/
│   │       └── dashboard/       # Legal Dashboard API
│
├── components/
│   ├── layout/
│   ├── ui/
│   ├── terrain/
│   ├── properties/
│   ├── maps/
│   ├── corporate/
│   ├── client/
│   ├── investor/
│   ├── contractor/
│   ├── finance/
│   └── legal/
│
├── lib/
│   ├── auth/                    # Authentication & Authorization
│   │   ├── permissions.ts       # Permission definitions
│   │   ├── middleware.ts        # Route protection middleware
│   │   ├── config.ts           # Auth configuration
│   │   └── session.ts          # Session management
│   ├── services/                # Service Layer
│   │   └── payment.service.ts   # Payment processing service
│   ├── security/                # Security Features
│   │   ├── rate-limiter.ts      # Rate limiting
│   │   ├── validation.ts       # Input validation
│   │   ├── error-monitoring.ts # Error monitoring
│   │   └── file-access.ts       # Secure file access
│   ├── data/
│   ├── types/
│   │   ├── index.ts            # Core types
│   │   └── auth.types.ts       # Authentication types
│   ├── constants/
│   └── utils/
│       └── cn.ts               # Class name utility
│
├── docs/
│   └── PHASE2_ARCHITECTURE.md  # Phase 2 architecture documentation
│
└── prisma/
    └── schema.prisma            # Database schema
```

---

# Phase 2 Database Schema

## Overview

Phase 2 introduces a comprehensive database schema using Prisma ORM with PostgreSQL. The schema covers all Phase 2 modules including authentication, properties, investments, payments, construction, documents, verification, CRM, support, notifications, and audit logging.

## Key Models

### Authentication & Authorization
- `User` - User accounts with roles and permissions
- `Role` - System roles (Super Admin, Admin, Client, Investor, Contractor, Survey Officer, Legal Officer, Finance Officer, Sales Officer)
- `Permission` - Granular permissions for access control
- `Session` - User session management
- `AuditLog` - Audit trail for security events

### Properties & Investments
- `Property` - Land and home properties
- `InvestmentPool` - Investment opportunities
- `Investment` - User investments
- `InvestmentMilestone` - Investment project milestones

### Payments
- `Payment` - Payment transactions
- `PaymentMethod` - User payment methods
- `Invoice` - Billing invoices
- `Receipt` - Payment receipts
- `PaymentSchedule` - Installment schedules

### Construction
- `ConstructionProject` - Construction projects
- `ProjectMilestone` - Project milestones
- `Contractor` - Contractor information
- `Deliverable` - Contractor deliverables
- `ProjectMedia` - Project media files

### Documents & Verification
- `Document` - Document storage
- `VerificationRequest` - Property verification requests
- `VerificationDocument` - Verification document attachments
- `LegalDocument` - Legal documents and contracts

### CRM & Support
- `Lead` - Sales leads
- `LeadActivity` - Lead activity timeline
- `SupportTicket` - Support tickets
- `TicketMessage` - Support ticket conversations

### Notifications
- `Notification` - User notifications
- `NotificationPreference` - User notification settings

See `prisma/schema.prisma` for the complete schema definition.

---

# Phase 2 API Architecture

## Service Layer Pattern

Phase 2 implements a service layer pattern for API routes, separating business logic from route handlers.

### Structure

```
src/app/api/{module}/{resource}/route.ts
├── Service Layer Class
│   ├── Business logic methods
│   ├── Database operations
│   └── Validation
└── Route Handler
    ├── Authentication check
    ├── Permission check
    ├── Service call
    └── Response formatting
```

### Available API Endpoints

- `GET /api/client/dashboard` - Client dashboard data
- `GET /api/investor/dashboard` - Investor dashboard data
- `GET /api/contractor/dashboard` - Contractor dashboard data
- `GET /api/finance/dashboard` - Finance Officer dashboard data
- `GET /api/legal/dashboard` - Legal dashboard data

### Authentication & Authorization

All API endpoints require:
- Authentication via session management
- Permission checks using RBAC system
- Audit logging for security events

---

# Phase 2 Role-Based Access Control (RBAC)

## Roles

1. **Super Admin** - Full system access
2. **Admin** - Administrative functions
3. **Client** - Property buyers
4. **Investor** - Investment participants
5. **Contractor** - Construction workers
6. **Survey Officer** - Land survey and verification
7. **Legal Officer** - Legal and verification review
8. **Finance Officer** - Financial operations
9. **Sales Officer** - Sales and CRM

## Permissions

Granular permissions defined in `src/lib/auth/permissions.ts` include:
- Dashboard access permissions
- Property management permissions
- Investment permissions
- Payment permissions
- Construction permissions
- Verification permissions
- Document access permissions
- CRM permissions
- Support permissions

---

# Phase 2 Security Features

## Rate Limiting

- API rate limiting to prevent abuse
- Authentication rate limiting (5 attempts per 15 minutes)
- Upload rate limiting (20 uploads per hour)
- Payment rate limiting (10 attempts per hour)

## Input Validation

- Email validation
- Phone number validation (Nigerian format)
- Password policy enforcement
- File type and size validation
- Nigeria-specific validations (NIN, BVN, States)

## Error Monitoring

- Centralized error logging
- Error categorization (authentication, authorization, validation, database, etc.)
- Error severity levels (low, medium, high, critical)
- Error statistics and reporting

## Secure File Access

- File path validation
- Directory access control
- File type restrictions
- Document access control by role
- Secure file serving with proper headers

---

# Phase 2 Deployment Process

## Environment Variables

Required environment variables for Phase 2:

```bash
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Payment Gateways
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
FLUTTERWAVE_SECRET_KEY=
FLUTTERWAVE_PUBLIC_KEY=

# Application
APP_URL=
NODE_ENV=production
```

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

## Build & Deploy

```bash
# Install dependencies
npm install

# Build application
npm run build

# Start production server
npm start
```

---

# Getting Started

## Prerequisites

* Node.js 18+
* npm

## Installation

```bash
git clone https://github.com/Okoronkwo-David-Creator01/vor.git

cd vor

npm install

npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm start
```

---

## Linting

```bash
npm run lint
```

---

# Development Roadmap

## Phase 1 — MVP (Current)

* Complete frontend platform
* Property marketplace
* Verification workflows
* Investor portal foundation
* Corporate ecosystem

## Phase 2 — Platform Core (In Progress)

* Comprehensive dashboard system with role-based access control
* Prisma ORM with PostgreSQL database
* Enhanced authentication with MFA-ready architecture
* Payment infrastructure (Paystack/Flutterwave integration)
* Construction management system
* Legal & verification center
* API routes with service layer pattern
* Security features (rate limiting, validation, error monitoring, secure file access)

**Phase 2 Status:**
- ✅ Architecture design complete
- ✅ Database schema complete
- ✅ RBAC system implemented (9 roles)
- ✅ Authentication enhancement complete
- ✅ Client Dashboard complete
- ✅ Investor Portal complete
- ✅ Construction Management System complete
- ✅ Payment Infrastructure complete
- ✅ Legal & Verification Center complete
- ✅ API routes with service layer pattern complete
- ✅ Security features complete
- 🔄 Documentation in progress

## Phase 3 — Growth

* Payment integrations
* Loan marketplace
* Investor onboarding
* Advanced reporting
* Mobile application

## Phase 4 — Scale

* Multi-state expansion
* AI-assisted property risk scoring
* Advanced analytics
* Strategic partnerships
* Digital land registry initiatives

---

# Regulatory Alignment

VOR's operational framework references recognized Nigerian regulatory and professional institutions, including:

* Corporate Affairs Commission (CAC)
* Securities and Exchange Commission Nigeria (SEC)
* Federal Ministry of Housing & Urban Development (FMHUD)
* Lagos State Lands Bureau (LSLB)
* Surveyors Council of Nigeria (SURCON)
* Estate Surveyors and Valuers Registration Board of Nigeria (ESVARBON)

---

# Design System

| Element          | Value    |
| ---------------- | -------- |
| Primary Navy     | #0B1426  |
| Premium Gold     | #C4A052  |
| Trust Green      | #1A6B4A  |
| Cream Background | #F8F6F1  |
| Display Font     | Fraunces |
| Body Font        | DM Sans  |

---

# Status

🚧 Active Development

This repository currently represents the Phase 1 MVP of the VOR ecosystem and serves as the foundation for future property verification, development, financing, and investment services.

---

# License

Proprietary Software

Copyright © Vintage Outlook Realty (VOR).

All rights reserved.
