# Clerk and Convex Setup Guide

## Overview
This guide will help you migrate from Supabase to Clerk (Authentication) and Convex (Database) for the VOR Platform.

## Why Clerk + Convex?

### Clerk Authentication
- **Simple Setup**: Easy integration with Next.js
- **Built-in Features**: User management, session handling, MFA, social logins
- **Type-Safe**: Full TypeScript support
- **UI Components**: Pre-built authentication components
- **Secure**: Industry-standard security practices

### Convex Database
- **Real-time**: Automatic real-time data synchronization
- **Type-Safe**: End-to-end type safety from database to frontend
- **Serverless**: No database management required
- **Fast**: Optimized for performance with automatic caching
- **Simple**: No SQL required, uses JavaScript functions

## Alternative Database Options

If you prefer other databases, here are the best alternatives:

### 1. PostgreSQL with Prisma (Recommended for Traditional SQL)
- **Pros**: Mature, reliable, full SQL support, excellent tooling
- **Cons**: Requires database management, not real-time by default
- **Best for**: Complex queries, relational data, enterprise applications

### 2. MongoDB with Mongoose
- **Pros**: Flexible schema, good for unstructured data, scalable
- **Cons**: No built-in real-time, requires schema design
- **Best for**: Document-based applications, rapid prototyping

### 3. Supabase (Current - Being Removed)
- **Pros**: Full-featured, PostgreSQL-based, real-time
- **Cons**: Complex setup, can be overwhelming for simple apps
- **Best for**: Applications needing PostgreSQL with real-time features

### 4. Firebase (Firestore)
- **Pros**: Real-time by default, easy setup, good mobile support
- **Cons**: Vendor lock-in, limited query capabilities
- **Best for**: Mobile apps, real-time applications

### 5. PlanetScale (MySQL)
- **Pros**: Serverless MySQL, branching, excellent developer experience
- **Cons**: Limited to MySQL, no real-time
- **Best for**: Applications needing MySQL with serverless benefits

## Clerk Setup Instructions

### Step 1: Create Clerk Account
1. Go to [https://clerk.com](https://clerk.com)
2. Click "Sign Up" and create an account
3. Create a new application
4. Choose "Next.js" as your framework

### Step 2: Get Clerk API Keys
1. In your Clerk dashboard, go to "API Keys"
2. You'll need these keys:
   - **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY** (Public key for frontend)
   - **CLERK_SECRET_KEY** (Secret key for backend)
   - **NEXT_PUBLIC_CLERK_SIGN_IN_URL** (Optional: /sign-in)
   - **NEXT_PUBLIC_CLERK_SIGN_UP_URL** (Optional: /sign-up)

### Step 3: Configure Clerk in Your Project
Add these to your `.env` file:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Step 4: Install Clerk Dependencies
```bash
npm install @clerk/nextjs
```

## Convex Setup Instructions

### Step 1: Create Convex Account
1. Go to [https://convex.dev](https://convex.dev)
2. Click "Sign Up" and create an account
3. Create a new project
4. Choose "Next.js" as your framework

### Step 2: Get Convex API Keys
1. In your Convex dashboard, go to "Settings" → "API Keys"
2. You'll need:
   - **CONVEX_DEPLOYMENT** (Your deployment URL)
   - **CONVEX_PROVISION_HOST** (Provisioning host)

### Step 3: Configure Convex in Your Project
Add these to your `.env` file:
```env
CONVEX_DEPLOYMENT=your-deployment-url
CONVEX_PROVISION_HOST=https://provision.convex.cloud
```

### Step 4: Install Convex Dependencies
```bash
npm install convex
```

### Step 5: Initialize Convex
```bash
npx convex dev
```

## Database Schema Migration

### Current Supabase Tables
The project currently uses these Supabase tables:
- `land_properties` - Land/terrain property listings
- `home_listings` - Home and construction listings
- `profiles` - User profiles
- `inspection_requests` - Property inspection requests

### Convex Schema Structure
Convex uses a different approach - you define your schema in `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.string(), // 'admin', 'client', 'investor', etc.
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  properties: defineTable({
    title: v.string(),
    description: v.string(),
    price: v.number(),
    state: v.string(),
    lga: v.string(),
    city: v.optional(v.string()),
    size: v.string(),
    propertyType: v.string(), // 'terrain', 'home'
    titleType: v.string(), // 'buy', 'rent', 'lease'
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    investmentGrade: v.optional(v.string()),
    mapLink: v.optional(v.string()),
    images: v.array(v.string()),
    documents: v.array(v.string()),
    featured: v.boolean(),
    verificationStatus: v.string(), // 'pending', 'verified'
    createdBy: v.string(), // clerkId
    createdAt: v.number(),
  }).index("by_type", ["propertyType"]),

  inspectionRequests: defineTable({
    propertyId: v.id("properties"),
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    inspectionDate: v.number(),
    status: v.string(), // 'pending', 'approved', 'rejected'
    createdAt: v.number(),
  }).index("by_property", ["propertyId"]),
});
```

## Migration Steps

### Phase 1: Setup
1. ✅ Create Clerk account and get API keys
2. ✅ Create Convex account and get API keys
3. ✅ Install dependencies
4. ✅ Configure environment variables
5. ✅ Define Convex schema

### Phase 2: Authentication Migration
1. Replace Supabase Auth with Clerk in login/register pages
2. Update middleware to use Clerk authentication
3. Update session management hooks
4. Replace user profile management with Clerk user metadata

### Phase 3: Database Migration
1. Create Convex schema matching current Supabase tables
2. Migrate data from Supabase to Convex (if needed)
3. Replace all Supabase database queries with Convex queries
4. Update API routes to use Convex

### Phase 4: Component Updates
1. Update admin pages to use Convex
2. Update property creation to use Convex
3. Update user management to use Convex
4. Update all components that fetch data

### Phase 5: Cleanup
1. Remove all Supabase imports
2. Remove Supabase client files
3. Remove Supabase dependencies from package.json
4. Delete Supabase configuration files
5. Test all features

## Testing Checklist

After migration, test these features:
- [ ] User registration and login
- [ ] Admin login and authentication
- [ ] Session timeout (7 minutes)
- [ ] Property creation (Terrain)
- [ ] Property creation (Home & Construct)
- [ ] Image/video upload
- [ ] Document upload
- [ ] Property listing display
- [ ] User management (admin)
- [ ] Inspection requests
- [ ] Search and filter functionality
- [ ] Real-time updates (if applicable)

## Troubleshooting

### Common Issues

**Issue: Clerk authentication not working**
- Solution: Ensure NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set correctly
- Check that ClerkProvider wraps your app in layout.tsx

**Issue: Convex connection failed**
- Solution: Verify CONVEX_DEPLOYMENT is correct
- Run `npx convex dev` to start the Convex backend

**Issue: Type errors after migration**
- Solution: Run `npx convex typegen` to generate TypeScript types
- Ensure you're importing types from `convex/_generated`

**Issue: Data not persisting**
- Solution: Check Convex functions are properly defined
- Verify you're using `useMutation` and `useQuery` correctly

## Support Resources

- Clerk Documentation: [https://clerk.com/docs](https://clerk.com/docs)
- Convex Documentation: [https://docs.convex.dev](https://docs.convex.dev)
- Clerk Discord: [https://discord.gg/clerkdev](https://discord.gg/clerkdev)
- Convex Discord: [https://discord.gg/convexdev](https://discord.gg/convexdev)

## Next Steps

1. Follow the setup instructions above
2. Review the migration phases
3. Start with Phase 1 (Setup)
4. Proceed through each phase systematically
5. Test thoroughly after each phase

## Notes

- This migration will require significant code changes across 36+ files
- Consider backing up your current code before starting
- Test in a development environment first
- The migration may take several hours to complete
- Some features may need adjustment to work with Convex's real-time model
