/**
 * VOR Phase 2 - Role-Based Access Control (RBAC) System
 * 
 * This file defines the complete permission structure for the VOR platform.
 * Permissions are organized by functional area and mapped to user roles.
 */

import { UserRole, Permission } from '@/types/auth.types';

// ============================================
// PERMISSION DEFINITIONS
// ============================================

export const PERMISSIONS = {
  // User Management
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',
  USER_ASSIGN_ROLES: 'user:assign_roles',
  
  // Property Management
  PROPERTY_READ: 'property:read',
  PROPERTY_WRITE: 'property:write',
  PROPERTY_DELETE: 'property:delete',
  PROPERTY_VERIFY: 'property:verify',
  
  // Investment Management
  INVESTMENT_READ: 'investment:read',
  INVESTMENT_WRITE: 'investment:write',
  INVESTMENT_APPROVE: 'investment:approve',
  INVESTMENT_DELETE: 'investment:delete',
  
  // Payment Management
  PAYMENT_READ: 'payment:read',
  PAYMENT_PROCESS: 'payment:process',
  PAYMENT_REFUND: 'payment:refund',
  PAYMENT_DELETE: 'payment:delete',
  
  // Construction Management
  CONSTRUCTION_READ: 'construction:read',
  CONSTRUCTION_WRITE: 'construction:write',
  CONSTRUCTION_APPROVE: 'construction:approve',
  CONSTRUCTION_DELETE: 'construction:delete',
  
  // Document Management
  DOCUMENT_READ: 'document:read',
  DOCUMENT_WRITE: 'document:write',
  DOCUMENT_DELETE: 'document:delete',
  DOCUMENT_VERIFY: 'document:verify',
  
  // Verification Management
  VERIFICATION_READ: 'verification:read',
  VERIFICATION_REVIEW: 'verification:review',
  VERIFICATION_APPROVE: 'verification:approve',
  VERIFICATION_REJECT: 'verification:reject',
  
  // CRM Management
  LEAD_READ: 'lead:read',
  LEAD_WRITE: 'lead:write',
  LEAD_DELETE: 'lead:delete',
  LEAD_ASSIGN: 'lead:assign',
  
  // Support Management
  TICKET_READ: 'ticket:read',
  TICKET_WRITE: 'ticket:write',
  TICKET_ASSIGN: 'ticket:assign',
  TICKET_DELETE: 'ticket:delete',
  
  // Analytics
  ANALYTICS_READ: 'analytics:read',
  ANALYTICS_EXPORT: 'analytics:export',
  
  // System Administration
  SYSTEM_READ: 'system:read',
  SYSTEM_WRITE: 'system:write',
  AUDIT_READ: 'audit:read',
  SETTINGS_MANAGE: 'settings:manage',
} as const;

// ============================================
// ROLE-PERMISSION MAPPINGS
// ============================================

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    // All permissions
    ...Object.values(PERMISSIONS),
  ],
  
  ADMIN: [
    // User Management (except delete)
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.USER_ASSIGN_ROLES,
    
    // Property Management
    PERMISSIONS.PROPERTY_READ,
    PERMISSIONS.PROPERTY_WRITE,
    PERMISSIONS.PROPERTY_VERIFY,
    
    // Investment Management
    PERMISSIONS.INVESTMENT_READ,
    PERMISSIONS.INVESTMENT_WRITE,
    PERMISSIONS.INVESTMENT_APPROVE,
    
    // Payment Management
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_PROCESS,
    PERMISSIONS.PAYMENT_REFUND,
    
    // Construction Management
    PERMISSIONS.CONSTRUCTION_READ,
    PERMISSIONS.CONSTRUCTION_WRITE,
    PERMISSIONS.CONSTRUCTION_APPROVE,
    
    // Document Management
    PERMISSIONS.DOCUMENT_READ,
    PERMISSIONS.DOCUMENT_WRITE,
    PERMISSIONS.DOCUMENT_VERIFY,
    
    // Verification Management
    PERMISSIONS.VERIFICATION_READ,
    PERMISSIONS.VERIFICATION_REVIEW,
    PERMISSIONS.VERIFICATION_APPROVE,
    PERMISSIONS.VERIFICATION_REJECT,
    
    // CRM Management
    PERMISSIONS.LEAD_READ,
    PERMISSIONS.LEAD_WRITE,
    PERMISSIONS.LEAD_ASSIGN,
    
    // Support Management
    PERMISSIONS.TICKET_READ,
    PERMISSIONS.TICKET_WRITE,
    PERMISSIONS.TICKET_ASSIGN,
    
    // Analytics
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.ANALYTICS_EXPORT,
    
    // System
    PERMISSIONS.SYSTEM_READ,
    PERMISSIONS.SETTINGS_MANAGE,
    PERMISSIONS.AUDIT_READ,
  ],
  
  CLIENT: [
    // Read own data
    PERMISSIONS.PROPERTY_READ,
    PERMISSIONS.INVESTMENT_READ,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.CONSTRUCTION_READ,
    PERMISSIONS.DOCUMENT_READ,
    PERMISSIONS.VERIFICATION_READ,
    PERMISSIONS.TICKET_READ,
    PERMISSIONS.TICKET_WRITE,
    
    // Write own data
    PERMISSIONS.DOCUMENT_WRITE,
  ],
  
  INVESTOR: [
    // Investment operations
    PERMISSIONS.INVESTMENT_READ,
    PERMISSIONS.INVESTMENT_WRITE,
    
    // Payment operations
    PERMISSIONS.PAYMENT_READ,
    
    // Document operations
    PERMISSIONS.DOCUMENT_READ,
    PERMISSIONS.DOCUMENT_WRITE,
    
    // Analytics
    PERMISSIONS.ANALYTICS_READ,
  ],
  
  CONTRACTOR: [
    // Construction operations
    PERMISSIONS.CONSTRUCTION_READ,
    PERMISSIONS.CONSTRUCTION_WRITE,
    
    // Document operations
    PERMISSIONS.DOCUMENT_READ,
    PERMISSIONS.DOCUMENT_WRITE,
    
    // Support
    PERMISSIONS.TICKET_READ,
    PERMISSIONS.TICKET_WRITE,
  ],
  
  SURVEY_OFFICER: [
    // Verification operations
    PERMISSIONS.VERIFICATION_READ,
    PERMISSIONS.VERIFICATION_REVIEW,
    PERMISSIONS.VERIFICATION_APPROVE,
    PERMISSIONS.VERIFICATION_REJECT,
    
    // Document operations
    PERMISSIONS.DOCUMENT_READ,
    PERMISSIONS.DOCUMENT_VERIFY,
    
    // Property operations
    PERMISSIONS.PROPERTY_READ,
    PERMISSIONS.PROPERTY_VERIFY,
  ],
  
  LEGAL_OFFICER: [
    // Verification operations
    PERMISSIONS.VERIFICATION_READ,
    PERMISSIONS.VERIFICATION_REVIEW,
    PERMISSIONS.VERIFICATION_APPROVE,
    PERMISSIONS.VERIFICATION_REJECT,
    
    // Document operations
    PERMISSIONS.DOCUMENT_READ,
    PERMISSIONS.DOCUMENT_VERIFY,
    
    // Property operations
    PERMISSIONS.PROPERTY_READ,
    PERMISSIONS.PROPERTY_VERIFY,
  ],
  
  FINANCE_OFFICER: [
    // Payment operations
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_PROCESS,
    PERMISSIONS.PAYMENT_REFUND,
    
    // Investment operations
    PERMISSIONS.INVESTMENT_READ,
    PERMISSIONS.INVESTMENT_APPROVE,
    
    // Analytics
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.ANALYTICS_EXPORT,
  ],
  
  SALES_OFFICER: [
    // CRM operations
    PERMISSIONS.LEAD_READ,
    PERMISSIONS.LEAD_WRITE,
    PERMISSIONS.LEAD_ASSIGN,
    
    // Property operations
    PERMISSIONS.PROPERTY_READ,
    PERMISSIONS.PROPERTY_WRITE,
    
    // Analytics
    PERMISSIONS.ANALYTICS_READ,
  ],
};

// ============================================
// PERMISSION CHECKING UTILITIES
// ============================================

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[role] || [];
  return rolePermissions.includes(permission);
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: string[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: string[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): string[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if a role can access a specific route
 */
export function canAccessRoute(role: UserRole, route: string): boolean {
  const routePermissions: Record<string, string[]> = {
    '/dashboard/admin': [PERMISSIONS.SYSTEM_READ],
    '/dashboard/client': [PERMISSIONS.PROPERTY_READ],
    '/dashboard/investor': [PERMISSIONS.INVESTMENT_READ],
    '/dashboard/contractor': [PERMISSIONS.CONSTRUCTION_READ],
    '/dashboard/officer': [PERMISSIONS.VERIFICATION_READ],
    '/dashboard/finance': [PERMISSIONS.PAYMENT_READ],
    '/dashboard/sales': [PERMISSIONS.LEAD_READ],
  };
  
  const requiredPermissions = routePermissions[route];
  if (!requiredPermissions) return false;
  
  return hasAnyPermission(role, requiredPermissions);
}

// ============================================
// RESOURCE OWNERSHIP CHECKS
// ============================================

/**
 * Check if a user can modify a resource
 * Users can modify their own resources, admins can modify any
 */
export function canModifyResource(
  userRole: UserRole,
  userId: string,
  resourceOwnerId: string
): boolean {
  // Super admins and admins can modify any resource
  if (userRole === UserRole.SUPER_ADMIN || userRole === UserRole.ADMIN) {
    return true;
  }
  
  // Users can modify their own resources
  return userId === resourceOwnerId;
}

/**
 * Check if a user can delete a resource
 * Only admins can delete resources
 */
export function canDeleteResource(userRole: UserRole): boolean {
  return userRole === UserRole.SUPER_ADMIN || userRole === UserRole.ADMIN;
}

// ============================================
// PERMISSION GROUPS
// ============================================

export const PERMISSION_GROUPS = {
  USER_MANAGEMENT: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_ASSIGN_ROLES,
  ],
  
  PROPERTY_MANAGEMENT: [
    PERMISSIONS.PROPERTY_READ,
    PERMISSIONS.PROPERTY_WRITE,
    PERMISSIONS.PROPERTY_DELETE,
    PERMISSIONS.PROPERTY_VERIFY,
  ],
  
  INVESTMENT_MANAGEMENT: [
    PERMISSIONS.INVESTMENT_READ,
    PERMISSIONS.INVESTMENT_WRITE,
    PERMISSIONS.INVESTMENT_APPROVE,
    PERMISSIONS.INVESTMENT_DELETE,
  ],
  
  PAYMENT_MANAGEMENT: [
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_PROCESS,
    PERMISSIONS.PAYMENT_REFUND,
    PERMISSIONS.PAYMENT_DELETE,
  ],
  
  CONSTRUCTION_MANAGEMENT: [
    PERMISSIONS.CONSTRUCTION_READ,
    PERMISSIONS.CONSTRUCTION_WRITE,
    PERMISSIONS.CONSTRUCTION_APPROVE,
    PERMISSIONS.CONSTRUCTION_DELETE,
  ],
  
  DOCUMENT_MANAGEMENT: [
    PERMISSIONS.DOCUMENT_READ,
    PERMISSIONS.DOCUMENT_WRITE,
    PERMISSIONS.DOCUMENT_DELETE,
    PERMISSIONS.DOCUMENT_VERIFY,
  ],
  
  VERIFICATION_MANAGEMENT: [
    PERMISSIONS.VERIFICATION_READ,
    PERMISSIONS.VERIFICATION_REVIEW,
    PERMISSIONS.VERIFICATION_APPROVE,
    PERMISSIONS.VERIFICATION_REJECT,
  ],
  
  CRM_MANAGEMENT: [
    PERMISSIONS.LEAD_READ,
    PERMISSIONS.LEAD_WRITE,
    PERMISSIONS.LEAD_DELETE,
    PERMISSIONS.LEAD_ASSIGN,
  ],
  
  SUPPORT_MANAGEMENT: [
    PERMISSIONS.TICKET_READ,
    PERMISSIONS.TICKET_WRITE,
    PERMISSIONS.TICKET_ASSIGN,
    PERMISSIONS.TICKET_DELETE,
  ],
  
  ANALYTICS: [
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.ANALYTICS_EXPORT,
  ],
  
  SYSTEM_ADMINISTRATION: [
    PERMISSIONS.SYSTEM_READ,
    PERMISSIONS.SYSTEM_WRITE,
    PERMISSIONS.AUDIT_READ,
    PERMISSIONS.SETTINGS_MANAGE,
  ],
};
