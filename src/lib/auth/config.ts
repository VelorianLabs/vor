/**
 * VOR Phase 2 - Authentication Configuration
 * 
 * Configuration for NextAuth.js with MFA-ready architecture
 * This will be integrated with NextAuth.js for production
 */

import { UserRole } from '@/types/auth.types';

export const AUTH_CONFIG = {
  // Session configuration
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Pages
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },

  // Callbacks
  callbacks: {
    async signIn({ user, account, profile }: any) {
      // Allow sign in for verified email addresses
      if (account?.provider === 'email') {
        return user.emailVerified ? true : false;
      }
      return true;
    },

    async redirect({ url, baseUrl }: any) {
      // Redirect to dashboard after login
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },

    async session({ session, token }: any) {
      // Add user role and permissions to session
      if (token?.role) {
        session.user.role = token.role;
        session.user.permissions = token.permissions;
        session.user.id = token.id;
      }
      return session;
    },

    async jwt({ token, user, account }: any) {
      // Add user info to JWT on initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
  },

  // Providers (to be configured)
  providers: [
    // Email provider will be added
    // OAuth providers can be added later
  ],

  // Database adapter (to be configured with Prisma)
  adapter: undefined, // Will be configured with Prisma adapter

  // Events
  events: {
    async signIn({ user, account, profile, isNewUser }: any) {
      // Log sign in event
      console.log('User signed in:', user.email);
      
      // Create session log
      if (user.id) {
        await createSessionLog(user.id);
      }
    },

    async signOut({ token, session }: any) {
      // Log sign out event
      console.log('User signed out:', token?.email);
      
      // Update session log
      if (token?.id) {
        await updateSessionLog(token.id);
      }
    },

    async createUser({ user }: any) {
      // Log new user creation
      console.log('New user created:', user.email);
      
      // Assign default role (CLIENT)
      // This will be handled by the user service
    },

    async updateUser({ user }: any) {
      // Log user update
      console.log('User updated:', user.email);
    },
  },
};

// ============================================
// MFA CONFIGURATION
// ============================================

export const MFA_CONFIG = {
  enabled: true,
  methods: ['totp', 'sms'], // Time-based OTP, SMS
  totp: {
    issuer: 'VOR Platform',
    digits: 6,
    period: 30, // seconds
    algorithm: 'SHA1',
  },
  sms: {
    provider: 'twilio', // or another SMS provider
    template: 'Your VOR verification code is: {code}',
  },
  backupCodes: {
    count: 10,
    length: 8,
  },
};

// ============================================
// SESSION MANAGEMENT
// ============================================

export const SESSION_CONFIG = {
  // Session timeout
  timeout: 30 * 60 * 1000, // 30 minutes of inactivity

  // Maximum concurrent sessions per user
  maxConcurrentSessions: 3,

  // Session security
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax' as const,

  // Remember me
  rememberMeDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// ============================================
// PASSWORD POLICY
// ============================================

export const PASSWORD_POLICY = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  forbiddenPatterns: [
    'password',
    '123456',
    'qwerty',
  ],
  maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days - force password change
};

// ============================================
// ACCOUNT LOCKOUT POLICY
// ============================================

export const LOCKOUT_POLICY = {
  enabled: true,
  maxAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  progressiveDelay: true, // Increase lockout time with each failed attempt
};

// ============================================
// AUDIT CONFIGURATION
// ============================================

export const AUDIT_CONFIG = {
  enabled: true,
  logAllActions: true,
  sensitiveActions: [
    'user:write',
    'user:delete',
    'user:assign_roles',
    'payment:process',
    'payment:refund',
    'investment:approve',
    'property:delete',
    'settings:manage',
  ],
  retentionPeriod: 365 * 24 * 60 * 60 * 1000, // 1 year
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create session log on user login
 */
async function createSessionLog(userId: string) {
  // TODO: Implement session log creation
  // This will use the Prisma client to create a SessionLog entry
  console.log('Creating session log for user:', userId);
}

/**
 * Update session log on user logout
 */
async function updateSessionLog(userId: string) {
  // TODO: Implement session log update
  // This will update the SessionLog entry with logout timestamp
  console.log('Updating session log for user:', userId);
}

/**
 * Validate password against policy
 */
export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < PASSWORD_POLICY.minLength) {
    errors.push(`Password must be at least ${PASSWORD_POLICY.minLength} characters`);
  }

  if (password.length > PASSWORD_POLICY.maxLength) {
    errors.push(`Password must not exceed ${PASSWORD_POLICY.maxLength} characters`);
  }

  if (PASSWORD_POLICY.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (PASSWORD_POLICY.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (PASSWORD_POLICY.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (PASSWORD_POLICY.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  for (const pattern of PASSWORD_POLICY.forbiddenPatterns) {
    if (password.toLowerCase().includes(pattern)) {
      errors.push(`Password cannot contain common patterns like "${pattern}"`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if action requires audit logging
 */
export function requiresAuditLog(action: string): boolean {
  if (!AUDIT_CONFIG.enabled) return false;
  if (AUDIT_CONFIG.logAllActions) return true;
  return AUDIT_CONFIG.sensitiveActions.includes(action);
}

/**
 * Get default role for new user
 */
export function getDefaultRole(): UserRole {
  return UserRole.CLIENT;
}

/**
 * Check if user can be assigned a role
 */
export function canAssignRole(assignerRole: UserRole, targetRole: UserRole): boolean {
  // Only SUPER_ADMIN can assign SUPER_ADMIN
  if (targetRole === UserRole.SUPER_ADMIN) {
    return assignerRole === UserRole.SUPER_ADMIN;
  }

  // SUPER_ADMIN and ADMIN can assign any role except SUPER_ADMIN
  if (assignerRole === UserRole.SUPER_ADMIN || assignerRole === UserRole.ADMIN) {
    return true;
  }

  // Other roles cannot assign roles
  return false;
}
