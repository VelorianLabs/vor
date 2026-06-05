/**
 * VOR Phase 2 - Error Monitoring
 * 
 * Error monitoring and logging system for tracking application errors,
   performance issues, and security events.
 */

// ============================================
// ERROR TYPES
// ============================================

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ErrorCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  DATABASE = 'database',
  EXTERNAL_API = 'external_api',
  PAYMENT = 'payment',
  FILE_UPLOAD = 'file_upload',
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  UNKNOWN = 'unknown',
}

export interface ErrorLog {
  id: string;
  timestamp: Date;
  severity: ErrorSeverity;
  category: ErrorCategory;
  message: string;
  stack?: string;
  userId?: string;
  userRole?: string;
  ipAddress?: string;
  userAgent?: string;
  url?: string;
  method?: string;
  statusCode?: number;
  metadata?: Record<string, any>;
}

// ============================================
// ERROR MONITORING SERVICE
// ============================================

class ErrorMonitoringService {
  private errorLogs: ErrorLog[] = [];
  private maxLogs = 1000;

  /**
   * Log an error
   */
  log(error: Error | string, context: {
    severity?: ErrorSeverity;
    category?: ErrorCategory;
    userId?: string;
    userRole?: string;
    ipAddress?: string;
    userAgent?: string;
    url?: string;
    method?: string;
    statusCode?: number;
    metadata?: Record<string, any>;
  } = {}): ErrorLog {
    const errorLog: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date(),
      severity: context.severity || ErrorSeverity.MEDIUM,
      category: context.category || ErrorCategory.UNKNOWN,
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      userId: context.userId,
      userRole: context.userRole,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      url: context.url,
      method: context.method,
      statusCode: context.statusCode,
      metadata: context.metadata,
    };

    this.errorLogs.push(errorLog);

    // Keep only the most recent logs
    if (this.errorLogs.length > this.maxLogs) {
      this.errorLogs = this.errorLogs.slice(-this.maxLogs);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Monitoring]', errorLog);
    }

    // TODO: Send to external error tracking service (e.g., Sentry, LogRocket)
    // this.sendToExternalService(errorLog);

    return errorLog;
  }

  /**
   * Log authentication error
   */
  logAuthError(error: Error | string, context: {
    userId?: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: Record<string, any>;
  } = {}): ErrorLog {
    return this.log(error, {
      ...context,
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.AUTHENTICATION,
    });
  }

  /**
   * Log authorization error
   */
  logAuthzError(error: Error | string, context: {
    userId?: string;
    userRole?: string;
    requiredPermission?: string;
    url?: string;
    method?: string;
    metadata?: Record<string, any>;
  } = {}): ErrorLog {
    return this.log(error, {
      ...context,
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.AUTHORIZATION,
      metadata: {
        ...context.metadata,
        requiredPermission: context.requiredPermission,
      },
    });
  }

  /**
   * Log validation error
   */
  logValidationError(error: Error | string, context: {
    userId?: string;
    field?: string;
    value?: any;
    metadata?: Record<string, any>;
  } = {}): ErrorLog {
    return this.log(error, {
      ...context,
      severity: ErrorSeverity.LOW,
      category: ErrorCategory.VALIDATION,
      metadata: {
        ...context.metadata,
        field: context.field,
        value: context.value,
      },
    });
  }

  /**
   * Log database error
   */
  logDatabaseError(error: Error | string, context: {
    query?: string;
    table?: string;
    metadata?: Record<string, any>;
  } = {}): ErrorLog {
    return this.log(error, {
      ...context,
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.DATABASE,
      metadata: {
        ...context.metadata,
        query: context.query,
        table: context.table,
      },
    });
  }

  /**
   * Log external API error
   */
  logExternalApiError(error: Error | string, context: {
    service?: string;
    endpoint?: string;
    statusCode?: number;
    metadata?: Record<string, any>;
  } = {}): ErrorLog {
    return this.log(error, {
      ...context,
      severity: ErrorSeverity.MEDIUM,
      category: ErrorCategory.EXTERNAL_API,
      metadata: {
        ...context.metadata,
        service: context.service,
        endpoint: context.endpoint,
      },
    });
  }

  /**
   * Log payment error
   */
  logPaymentError(error: Error | string, context: {
    userId?: string;
    transactionId?: string;
    amount?: number;
    gateway?: string;
    metadata?: Record<string, any>;
  } = {}): ErrorLog {
    return this.log(error, {
      ...context,
      severity: ErrorSeverity.CRITICAL,
      category: ErrorCategory.PAYMENT,
      metadata: {
        ...context.metadata,
        transactionId: context.transactionId,
        amount: context.amount,
        gateway: context.gateway,
      },
    });
  }

  /**
   * Log security event
   */
  logSecurityEvent(error: Error | string, context: {
    eventType?: string;
    userId?: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: Record<string, any>;
  } = {}): ErrorLog {
    return this.log(error, {
      ...context,
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.SECURITY,
      metadata: {
        ...context.metadata,
        eventType: context.eventType,
      },
    });
  }

  /**
   * Get error logs
   */
  getLogs(filters: {
    severity?: ErrorSeverity;
    category?: ErrorCategory;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  } = {}): ErrorLog[] {
    let logs = [...this.errorLogs];

    if (filters.severity) {
      logs = logs.filter(log => log.severity === filters.severity);
    }

    if (filters.category) {
      logs = logs.filter(log => log.category === filters.category);
    }

    if (filters.userId) {
      logs = logs.filter(log => log.userId === filters.userId);
    }

    if (filters.startDate) {
      logs = logs.filter(log => log.timestamp >= filters.startDate!);
    }

    if (filters.endDate) {
      logs = logs.filter(log => log.timestamp <= filters.endDate!);
    }

    if (filters.limit) {
      logs = logs.slice(-filters.limit);
    }

    return logs;
  }

  /**
   * Get error statistics
   */
  getStatistics(): {
    total: number;
    bySeverity: Record<ErrorSeverity, number>;
    byCategory: Record<ErrorCategory, number>;
    recent: ErrorLog[];
  } {
    const bySeverity: Record<ErrorSeverity, number> = {
      [ErrorSeverity.LOW]: 0,
      [ErrorSeverity.MEDIUM]: 0,
      [ErrorSeverity.HIGH]: 0,
      [ErrorSeverity.CRITICAL]: 0,
    };

    const byCategory: Record<ErrorCategory, number> = {
      [ErrorCategory.AUTHENTICATION]: 0,
      [ErrorCategory.AUTHORIZATION]: 0,
      [ErrorCategory.VALIDATION]: 0,
      [ErrorCategory.DATABASE]: 0,
      [ErrorCategory.EXTERNAL_API]: 0,
      [ErrorCategory.PAYMENT]: 0,
      [ErrorCategory.FILE_UPLOAD]: 0,
      [ErrorCategory.SECURITY]: 0,
      [ErrorCategory.PERFORMANCE]: 0,
      [ErrorCategory.UNKNOWN]: 0,
    };

    for (const log of this.errorLogs) {
      bySeverity[log.severity]++;
      byCategory[log.category]++;
    }

    return {
      total: this.errorLogs.length,
      bySeverity,
      byCategory,
      recent: this.errorLogs.slice(-10),
    };
  }

  /**
   * Clear old logs
   */
  clearOldLogs(olderThanDays: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    this.errorLogs = this.errorLogs.filter(log => log.timestamp > cutoffDate);
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Send to external error tracking service (placeholder)
   */
  private sendToExternalService(errorLog: ErrorLog): void {
    // TODO: Implement integration with external service
    // Example: Sentry.captureException(errorLog);
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

export const errorMonitor = new ErrorMonitoringService();

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Wrap an async function with error monitoring
 */
export function withErrorMonitoring<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context: {
    category?: ErrorCategory;
    severity?: ErrorSeverity;
    metadata?: Record<string, any>;
  } = {}
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      errorMonitor.log(error as Error, context);
      throw error;
    }
  }) as T;
}

/**
 * Create an error response with proper logging
 */
export function createErrorResponse(
  error: Error | string,
  statusCode: number = 500,
  context: {
    category?: ErrorCategory;
    severity?: ErrorSeverity;
    metadata?: Record<string, any>;
  } = {}
): {
  success: false;
  error: string;
  statusCode: number;
} {
  errorMonitor.log(error, {
    ...context,
    statusCode,
  });

  return {
    success: false,
    error: typeof error === 'string' ? error : error.message,
    statusCode,
  };
}

/**
 * Handle API errors with proper logging
 */
export function handleApiError(
  error: unknown,
  context: {
    url?: string;
    method?: string;
    userId?: string;
    userRole?: string;
  } = {}
): {
  success: false;
  error: string;
  statusCode: number;
} {
  if (error instanceof Error) {
    // Log the error
    errorMonitor.log(error, {
      ...context,
      category: ErrorCategory.UNKNOWN,
      severity: ErrorSeverity.MEDIUM,
    });

    // Return appropriate response
    return {
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred',
      statusCode: 500,
    };
  }

  return {
    success: false,
    error: 'An unknown error occurred',
    statusCode: 500,
  };
}
