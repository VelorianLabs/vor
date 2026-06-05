/**
 * VOR Phase 2 - RBAC Middleware
 * 
 * Provides middleware functions for protecting routes and API endpoints
 * based on user roles and permissions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { UserRole, Permission } from '@/types/auth.types';
import { hasPermission, hasAnyPermission, canAccessRoute } from './permissions';

/**
 * Check if user has required permission
 */
export function requirePermission(permission: Permission) {
  return (userRole: UserRole): boolean => {
    return hasPermission(userRole, permission);
  };
}

/**
 * Check if user has any of the required permissions
 */
export function requireAnyPermission(permissions: Permission[]) {
  return (userRole: UserRole): boolean => {
    return hasAnyPermission(userRole, permissions);
  };
}

/**
 * Check if user has all required permissions
 */
export function requireAllPermissions(permissions: Permission[]) {
  return (userRole: UserRole): boolean => {
    return permissions.every(p => hasPermission(userRole, p));
  };
}

/**
 * Check if user can access a specific route
 */
export function requireRouteAccess(route: string) {
  return (userRole: UserRole): boolean => {
    return canAccessRoute(userRole, route);
  };
}

/**
 * Middleware to protect API routes
 */
export function withAuth(
  handler: (req: NextRequest, context: any) => Promise<NextResponse>,
  options?: {
    requiredPermissions?: Permission[];
    requireAll?: boolean;
    allowedRoles?: UserRole[];
  }
) {
  return async (req: NextRequest, context: any) => {
    try {
      // Get user from session (this would integrate with NextAuth)
      const user = await getUserFromRequest(req);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      
      // Check if user is active
      if (!user.isActive) {
        return NextResponse.json(
          { error: 'Account is inactive' },
          { status: 403 }
        );
      }
      
      // Check role restrictions
      if (options?.allowedRoles && !options.allowedRoles.includes(user.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      // Check permission requirements
      if (options?.requiredPermissions) {
        const hasAccess = options.requireAll
          ? requireAllPermissions(options.requiredPermissions)(user.role)
          : requireAnyPermission(options.requiredPermissions)(user.role);
        
        if (!hasAccess) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          );
        }
      }
      
      // Attach user to request context
      context.user = user;
      
      return handler(req, context);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Get user from request (integrates with NextAuth)
 * This is a placeholder - actual implementation would use NextAuth session
 */
async function getUserFromRequest(req: NextRequest): Promise<any> {
  // TODO: Integrate with NextAuth.js
  // This would typically:
  // 1. Get session token from cookies
  // 2. Validate token
  // 3. Fetch user from database
  // 4. Return user with permissions
  
  return null;
}

/**
 * Middleware to protect client-side routes
 * This would be used in a Next.js middleware.ts file
 */
export function createRouteProtection() {
  return function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
    // Public routes that don't require authentication
    const publicRoutes = [
      '/',
      '/terrain',
      '/home-construct',
      '/finance',
      '/corporate',
      '/login',
      '/register',
      '/api/auth',
    ];
    
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }
    
    // Protected routes
    const protectedRoutes = [
      '/dashboard',
      '/api/users',
      '/api/properties',
      '/api/investments',
      '/api/payments',
      '/api/construction',
      '/api/documents',
      '/api/verification',
      '/api/crm',
      '/api/notifications',
      '/api/analytics',
    ];
    
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      // Check for session
      const session = req.cookies.get('session');
      
      if (!session) {
        // Redirect to login for client routes
        if (pathname.startsWith('/dashboard')) {
          return NextResponse.redirect(new URL('/login', req.url));
        }
        
        // Return 401 for API routes
        if (pathname.startsWith('/api')) {
          return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          );
        }
      }
    }
    
    return NextResponse.next();
  };
}

/**
 * Audit logging middleware
 * Logs all mutations for compliance
 */
export function withAuditLog(
  action: string,
  resource: string
) {
  return async (
    req: NextRequest,
    context: any,
    handler: () => Promise<NextResponse>
  ) => {
    const user = context.user;
    const resourceId = context.params?.id;
    
    try {
      const response = await handler();
      
      // Log the action if successful
      if (response.status < 400) {
        await logAudit({
          userId: user?.id,
          action,
          resource,
          resourceId,
          metadata: {
            method: req.method,
            path: req.nextUrl.pathname,
          },
          ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
          userAgent: req.headers.get('user-agent') || undefined,
        });
      }
      
      return response;
    } catch (error) {
      // Log failed attempts as well
      await logAudit({
        userId: user?.id,
        action,
        resource,
        resourceId,
        metadata: {
          method: req.method,
          path: req.nextUrl.pathname,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
        userAgent: req.headers.get('user-agent') || undefined,
      });
      
      throw error;
    }
  };
}

/**
 * Log audit entry
 */
async function logAudit(data: {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}) {
  // TODO: Implement audit logging to database
  console.log('Audit Log:', data);
}

/**
 * Rate limiting middleware
 */
export function withRateLimit(options?: {
  requestsPerMinute?: number;
  burstSize?: number;
}) {
  const requestsPerMinute = options?.requestsPerMinute || 60;
  const burstSize = options?.burstSize || 10;
  
  const rateLimits = new Map<string, { count: number; resetTime: number }>();
  
  return async (req: NextRequest, context: any, handler: () => Promise<NextResponse>) => {
    const identifier = (req.headers.get('x-forwarded-for') || 
                      req.headers.get('x-real-ip') || 
                      'unknown') as string;
    
    const now = Date.now();
    const limit = rateLimits.get(identifier);
    
    if (!limit || now > limit.resetTime) {
      rateLimits.set(identifier, {
        count: 1,
        resetTime: now + 60000, // 1 minute
      });
      return handler();
    }
    
    if (limit.count >= requestsPerMinute) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': requestsPerMinute.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': limit.resetTime.toString(),
          },
        }
      );
    }
    
    limit.count++;
    return handler();
  };
}
