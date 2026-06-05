/**
 * VOR Phase 2 - Session Management Utilities
 * 
 * Provides utilities for managing user sessions, tracking activity,
 * and handling session security.
 */

import { cookies } from 'next/headers';
import { User } from '@/types/auth.types';

export interface SessionData {
  user: User;
  expires: string;
  createdAt: string;
  lastActivity: string;
  ipAddress?: string;
  userAgent?: string;
}

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Get current session from cookies
 */
export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return null;
    }

    // TODO: Decrypt and validate session token
    // This will integrate with NextAuth.js
    const session = JSON.parse(sessionCookie.value) as SessionData;

    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Set session in cookies
 */
export async function setSession(session: SessionData): Promise<void> {
  try {
    const cookieStore = await cookies();
    
    cookieStore.set('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
  } catch (error) {
    console.error('Error setting session:', error);
  }
}

/**
 * Clear session from cookies
 */
export async function clearSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('session');
  } catch (error) {
    console.error('Error clearing session:', error);
  }
}

/**
 * Update session activity timestamp
 */
export async function updateSessionActivity(): Promise<void> {
  try {
    const session = await getSession();
    if (!session) return;

    session.lastActivity = new Date().toISOString();
    await setSession(session);
  } catch (error) {
    console.error('Error updating session activity:', error);
  }
}

/**
 * Check if session is valid
 */
export async function isSessionValid(): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  const now = new Date();
  const expires = new Date(session.expires);
  const lastActivity = new Date(session.lastActivity);

  // Check if session is expired
  if (now > expires) {
    return false;
  }

  // Check if session has been inactive for too long (30 minutes)
  const inactiveTime = now.getTime() - lastActivity.getTime();
  const maxInactiveTime = 30 * 60 * 1000; // 30 minutes

  if (inactiveTime > maxInactiveTime) {
    return false;
  }

  return true;
}

// ============================================
// SESSION SECURITY
// ============================================

/**
 * Validate session security
 */
export async function validateSessionSecurity(
  ipAddress?: string,
  userAgent?: string
): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  // Check IP address if session has one stored
  if (session.ipAddress && ipAddress) {
    // Allow for some IP variation (e.g., mobile networks)
    // but flag significant changes
    if (session.ipAddress !== ipAddress) {
      console.warn('Session IP address changed:', {
        old: session.ipAddress,
        new: ipAddress,
      });
      // TODO: Implement IP change verification
      // For now, allow but log the change
    }
  }

  // Check user agent if session has one stored
  if (session.userAgent && userAgent) {
    if (session.userAgent !== userAgent) {
      console.warn('Session user agent changed:', {
        old: session.userAgent,
        new: userAgent,
      });
      // TODO: Implement user agent change verification
      // For now, allow but log the change
    }
  }

  return true;
}

/**
 * Check for concurrent sessions
 */
export async function checkConcurrentSessions(userId: string): Promise<number> {
  // TODO: Implement concurrent session checking
  // This would query the database for active sessions
  // For now, return 0
  return 0;
}

/**
 * Terminate all sessions except current
 */
export async function terminateOtherSessions(userId: string): Promise<void> {
  // TODO: Implement session termination
  // This would invalidate all session tokens except the current one
  console.log('Terminating other sessions for user:', userId);
}

/**
 * Terminate specific session
 */
export async function terminateSession(sessionId: string): Promise<void> {
  // TODO: Implement specific session termination
  console.log('Terminating session:', sessionId);
}

// ============================================
// SESSION ACTIVITY TRACKING
// ============================================

/**
 * Track session activity for analytics
 */
export async function trackSessionActivity(
  action: string,
  metadata?: Record<string, any>
): Promise<void> {
  const session = await getSession();
  if (!session) return;

  // TODO: Implement activity tracking
  // This would log to the database for analytics
  console.log('Session activity:', {
    userId: session.user.id,
    action,
    metadata,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Get session statistics
 */
export async function getSessionStats(userId: string): Promise<{
  totalSessions: number;
  activeSessions: number;
  lastLogin: Date | null;
  averageSessionDuration: number;
}> {
  // TODO: Implement session statistics
  // This would query the database for session analytics
  return {
    totalSessions: 0,
    activeSessions: 0,
    lastLogin: null,
    averageSessionDuration: 0,
  };
}

// ============================================
// MFA SESSION HANDLING
// ============================================

/**
 * Check if MFA verification is required
 */
export async function requiresMfaVerification(): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  // Check if user has MFA enabled
  if (!session.user.isMfaEnabled) {
    return false;
  }

  // Check if MFA has been verified for this session
  const mfaVerified = await cookies().then(store => store.get('mfa_verified'));
  
  return !mfaVerified;
}

/**
 * Mark MFA as verified for current session
 */
export async function setMfaVerified(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set('mfa_verified', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
  } catch (error) {
    console.error('Error setting MFA verified:', error);
  }
}

/**
 * Clear MFA verification
 */
export async function clearMfaVerified(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('mfa_verified');
  } catch (error) {
    console.error('Error clearing MFA verified:', error);
  }
}

// ============================================
// SESSION HELPERS
// ============================================

/**
 * Get current user from session
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Check if user has specific role
 */
export async function hasRole(role: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return user.role === role;
}

/**
 * Check if user has any of the specified roles
 */
export async function hasAnyRole(roles: string[]): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return roles.includes(user.role);
}

/**
 * Get user permissions from session
 */
export async function getUserPermissions(): Promise<string[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  return user.permissions;
}
