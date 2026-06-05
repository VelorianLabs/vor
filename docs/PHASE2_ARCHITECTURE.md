# VOR Phase 2 Architecture

## Overview

Phase 2 transforms VOR from a property listing platform into a comprehensive real estate operations ecosystem supporting clients, investors, contractors, surveyors, legal officers, finance officers, and administrators.

## Architecture Principles

- **Scalability**: Modular architecture supporting horizontal scaling
- **Security**: Defense-in-depth with RBAC, audit logging, MFA-ready
- **Maintainability**: Clean architecture with service layer pattern
- **Performance**: Optimized queries, caching strategies, lazy loading
- **Compliance**: Audit trails, data retention, regulatory alignment

## Technology Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### Backend
- Next.js API Routes (Server Actions)
- Service Layer Pattern
- Repository Pattern
- PostgreSQL (via Prisma ORM)

### Infrastructure
- Authentication: NextAuth.js (MFA-ready)
- Storage: Cloud storage integration
- Payments: Paystack + Flutterwave
- Maps: Enhanced GIS integration
- Email: Resend/SendGrid
- File Processing: Sharp (images), PDF-lib (documents)

## Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/
│   │   ├── client/
│   │   │   ├── overview/
│   │   │   ├── portfolio/
│   │   │   ├── payments/
│   │   │   ├── documents/
│   │   │   └── support/
│   │   ├── investor/
│   │   │   ├── overview/
│   │   │   ├── marketplace/
│   │   │   ├── portfolio/
│   │   │   └── reports/
│   │   ├── contractor/
│   │   │   ├── overview/
│   │   │   ├── projects/
│   │   │   ├── deliverables/
│   │   │   └── requests/
│   │   ├── officer/
│   │   │   ├── survey/
│   │   │   ├── legal/
│   │   │   └── verification/
│   │   ├── finance/
│   │   │   ├── overview/
│   │   │   ├── transactions/
│   │   │   └── reports/
│   │   ├── sales/
│   │   │   ├── leads/
│   │   │   ├── pipeline/
│   │   │   └── activities/
│   │   └── admin/
│   │       ├── overview/
│   │       ├── users/
│   │       ├── roles/
│   │       ├── permissions/
│   │       ├── analytics/
│   │       ├── settings/
│   │       └── audit-logs/
│   ├── api/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── properties/
│   │   ├── investments/
│   │   ├── payments/
│   │   ├── construction/
│   │   ├── documents/
│   │   ├── verification/
│   │   ├── crm/
│   │   ├── notifications/
│   │   └── analytics/
│   ├── terrain/ (existing)
│   ├── home-construct/ (existing)
│   ├── finance/ (existing)
│   └── corporate/ (existing)
│
├── components/
│   ├── dashboard/
│   │   ├── client/
│   │   ├── investor/
│   │   ├── contractor/
│   │   ├── officer/
│   │   ├── finance/
│   │   ├── sales/
│   │   └── admin/
│   ├── shared/
│   │   ├── tables/
│   │   ├── forms/
│   │   ├── charts/
│   │   ├── modals/
│   │   └── notifications/
│   └── (existing components)
│
├── lib/
│   ├── auth/
│   │   ├── config.ts
│   │   ├── middleware.ts
│   │   ├── permissions.ts
│   │   └── session.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── property.service.ts
│   │   ├── investment.service.ts
│   │   ├── payment.service.ts
│   │   ├── construction.service.ts
│   │   ├── document.service.ts
│   │   ├── verification.service.ts
│   │   ├── crm.service.ts
│   │   ├── notification.service.ts
│   │   └── analytics.service.ts
│   ├── repositories/
│   │   ├── user.repository.ts
│   │   ├── property.repository.ts
│   │   ├── investment.repository.ts
│   │   ├── payment.repository.ts
│   │   ├── construction.repository.ts
│   │   ├── document.repository.ts
│   │   ├── verification.repository.ts
│   │   ├── crm.repository.ts
│   │   └── notification.repository.ts
│   ├── middleware/
│   │   ├── rbac.ts
│   │   ├── rate-limit.ts
│   │   └── audit.ts
│   ├── validators/
│   │   ├── auth.schema.ts
│   │   ├── property.schema.ts
│   │   ├── investment.schema.ts
│   │   ├── payment.schema.ts
│   │   └── common.schema.ts
│   ├── utils/
│   │   ├── pdf-generator.ts
│   │   ├── email-templates.ts
│   │   ├── file-upload.ts
│   │   └── formatters.ts
│   └── (existing lib files)
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
└── types/
    ├── auth.types.ts
    ├── dashboard.types.ts
    ├── api.types.ts
    └── (existing types)
```

## Database Schema Overview

### Core Tables
- **users**: User accounts with role assignments
- **roles**: Role definitions
- **permissions**: Granular permissions
- **role_permissions**: Role-permission mapping

### Property Tables
- **properties**: Extended property listings
- **lands**: Land-specific data
- **homes**: Home-specific data
- **property_documents**: Property-related documents

### Investment Tables
- **investment_projects**: Projects available for funding
- **investments**: User investments in projects
- **investment_reports**: Generated reports

### Payment Tables
- **payments**: All payment transactions
- **invoices**: Generated invoices
- **payment_schedules**: Installment schedules
- **receipts**: Payment receipts

### Construction Tables
- **construction_projects**: Construction projects
- **milestones**: Project milestones
- **contractor_assignments**: Contractor-project relationships
- **construction_media**: Project media (images, videos, reports)

### CRM Tables
- **crm_leads**: Lead management
- **sales_pipeline**: Pipeline stages
- **activities**: Activity timeline

### Verification Tables
- **verification_requests**: Document verification requests
- **verification_reviews**: Review workflow
- **verification_officers**: Officer assignments

### Support Tables
- **support_tickets**: Support ticketing system
- **ticket_messages**: Ticket communications

### Notification Tables
- **notifications**: User notifications
- **notification_preferences**: User notification settings

### Audit Tables
- **audit_logs**: System audit trail
- **session_logs**: User session tracking

## API Architecture

### Service Layer Pattern
```
API Route → Validator → Service → Repository → Database
                ↓
            Audit Logger
```

### Response Format
```typescript
{
  success: boolean,
  data?: T,
  error?: {
    code: string,
    message: string,
    details?: any
  },
  meta?: {
    pagination?: PaginationMeta,
    timestamp: string
  }
}
```

## Security Architecture

### Authentication Flow
1. User login with email/password
2. MFA challenge (if enabled)
3. Session creation with JWT
4. Permission loading
5. Route access check

### Authorization
- Route-level protection via middleware
- Component-level protection via hooks
- API-level protection via service layer
- Field-level protection via permissions

### Audit Logging
- All mutations logged
- Include user, action, resource, timestamp
- Sensitive actions require approval

## Performance Optimization

### Database
- Indexed queries
- Connection pooling
- Query optimization
- Read replicas (future)

### Caching
- Redis for session storage
- API response caching
- Static asset caching

### Frontend
- Code splitting by route
- Lazy loading components
- Image optimization
- Server components where possible

## Monitoring & Observability

### Logging
- Structured logging
- Error tracking
- Performance metrics

### Health Checks
- Database connectivity
- External service status
- API endpoint health

## Deployment Strategy

### Environment Variables
```env
# Database
DATABASE_URL=
DIRECT_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# External Services
PAYSTACK_SECRET_KEY=
FLUTTERWAVE_SECRET_KEY=
STORAGE_ACCESS_KEY=
EMAIL_API_KEY=

# App Configuration
APP_URL=
NODE_ENV=
```

### CI/CD Pipeline
1. Run tests
2. Build application
3. Run migrations
4. Deploy to staging
5. Run smoke tests
6. Deploy to production

## Future Phase 3 Considerations

- Fractional investing infrastructure
- Escrow services integration
- Mortgage infrastructure
- Digital land registry APIs
- AI valuation systems
- Real estate financial services

All architecture decisions made in Phase 2 will support these future expansions.
