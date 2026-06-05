/**
 * VOR Phase 2 - Authentication & Authorization Types
 */

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  INVESTOR = 'INVESTOR',
  CONTRACTOR = 'CONTRACTOR',
  SURVEY_OFFICER = 'SURVEY_OFFICER',
  LEGAL_OFFICER = 'LEGAL_OFFICER',
  FINANCE_OFFICER = 'FINANCE_OFFICER',
  SALES_OFFICER = 'SALES_OFFICER',
}

export enum Permission {
  // User Management
  USER_READ = 'user:read',
  USER_WRITE = 'user:write',
  USER_DELETE = 'user:delete',
  USER_ASSIGN_ROLES = 'user:assign_roles',
  
  // Property Management
  PROPERTY_READ = 'property:read',
  PROPERTY_WRITE = 'property:write',
  PROPERTY_DELETE = 'property:delete',
  PROPERTY_VERIFY = 'property:verify',
  
  // Investment Management
  INVESTMENT_READ = 'investment:read',
  INVESTMENT_WRITE = 'investment:write',
  INVESTMENT_APPROVE = 'investment:approve',
  INVESTMENT_DELETE = 'investment:delete',
  
  // Payment Management
  PAYMENT_READ = 'payment:read',
  PAYMENT_PROCESS = 'payment:process',
  PAYMENT_REFUND = 'payment:refund',
  PAYMENT_DELETE = 'payment:delete',
  
  // Construction Management
  CONSTRUCTION_READ = 'construction:read',
  CONSTRUCTION_WRITE = 'construction:write',
  CONSTRUCTION_APPROVE = 'construction:approve',
  CONSTRUCTION_DELETE = 'construction:delete',
  
  // Document Management
  DOCUMENT_READ = 'document:read',
  DOCUMENT_WRITE = 'document:write',
  DOCUMENT_DELETE = 'document:delete',
  DOCUMENT_VERIFY = 'document:verify',
  
  // Verification Management
  VERIFICATION_READ = 'verification:read',
  VERIFICATION_REVIEW = 'verification:review',
  VERIFICATION_APPROVE = 'verification:approve',
  VERIFICATION_REJECT = 'verification:reject',
  
  // CRM Management
  LEAD_READ = 'lead:read',
  LEAD_WRITE = 'lead:write',
  LEAD_DELETE = 'lead:delete',
  LEAD_ASSIGN = 'lead:assign',
  
  // Support Management
  TICKET_READ = 'ticket:read',
  TICKET_WRITE = 'ticket:write',
  TICKET_ASSIGN = 'ticket:assign',
  TICKET_DELETE = 'ticket:delete',
  
  // Analytics
  ANALYTICS_READ = 'analytics:read',
  ANALYTICS_EXPORT = 'analytics:export',
  
  // System Administration
  SYSTEM_READ = 'system:read',
  SYSTEM_WRITE = 'system:write',
  AUDIT_READ = 'audit:read',
  SETTINGS_MANAGE = 'settings:manage',
}

export interface User {
  id: string;
  email: string;
  emailVerified?: Date;
  name?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  isMfaEnabled: boolean;
  mfaSecret?: string;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Session {
  user: User;
  expires: string;
}

export interface AuthContext {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export interface PermissionCheck {
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  canAccessRoute: (route: string) => boolean;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface SessionLog {
  id: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  loginAt: Date;
  logoutAt?: Date;
}
