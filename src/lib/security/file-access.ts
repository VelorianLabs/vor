/**
 * VOR Phase 2 - Secure File Access
 * 
 * Secure file access controls for protecting sensitive files and documents.
 * Includes file path validation, access control, and secure file serving.
 */

import { existsSync, statSync, readFileSync } from 'fs';
import { join, resolve, normalize } from 'path';

// ============================================
// CONFIGURATION
// ============================================

const ALLOWED_DIRECTORIES = [
  '/public/uploads',
  '/public/documents',
  '/public/receipts',
  '/public/certificates',
];

const DENIED_EXTENSIONS = [
  '.exe',
  '.bat',
  '.cmd',
  '.sh',
  '.ps1',
  '.js',
  '.php',
  '.asp',
  '.aspx',
  '.jsp',
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// ============================================
// FILE ACCESS CONTROL
// ============================================

export interface FileAccessResult {
  allowed: boolean;
  filePath?: string;
  error?: string;
}

/**
 * Validate and sanitize file path
 */
export function validateFilePath(filePath: string): FileAccessResult {
  try {
    // Normalize the path
    const normalizedPath = normalize(filePath);

    // Resolve to absolute path
    const absolutePath = resolve(normalizedPath);

    // Check if path is within allowed directories
    const isAllowed = ALLOWED_DIRECTORIES.some((dir) => {
      const allowedPath = resolve(dir);
      return absolutePath.startsWith(allowedPath);
    });

    if (!isAllowed) {
      return {
        allowed: false,
        error: 'File path is not in an allowed directory',
      };
    }

    // Check for denied extensions
    const extension = filePath.split('.').pop()?.toLowerCase();
    if (extension && DENIED_EXTENSIONS.includes(`.${extension}`)) {
      return {
        allowed: false,
        error: 'File type is not allowed',
      };
    }

    // Check if file exists
    if (!existsSync(absolutePath)) {
      return {
        allowed: false,
        error: 'File does not exist',
      };
    }

    // Check file size
    const stats = statSync(absolutePath);
    if (stats.size > MAX_FILE_SIZE) {
      return {
        allowed: false,
        error: 'File size exceeds maximum allowed size',
      };
    }

    return {
      allowed: true,
      filePath: absolutePath,
    };
  } catch (error) {
    return {
      allowed: false,
      error: error instanceof Error ? error.message : 'Failed to validate file path',
    };
  }
}

/**
 * Check if user has access to file
 */
export function checkFileAccess(
  filePath: string,
  userId: string,
  userRole: string
): FileAccessResult {
  // First validate the file path
  const pathValidation = validateFilePath(filePath);
  if (!pathValidation.allowed) {
    return pathValidation;
  }

  // TODO: Implement role-based file access control
  // For now, allow all authenticated users to access files in allowed directories
  // In production, you would check:
  // - If the file belongs to the user
  // - If the user's role has permission to access the file type
  // - If the file is in a directory the user has access to

  return {
    allowed: true,
    filePath: pathValidation.filePath,
  };
}

/**
 * Get file with access control
 */
export function getFileWithAccessControl(
  filePath: string,
  userId: string,
  userRole: string
): { success: boolean; data?: Buffer; error?: string } {
  const accessCheck = checkFileAccess(filePath, userId, userRole);

  if (!accessCheck.allowed) {
    return {
      success: false,
      error: accessCheck.error,
    };
  }

  try {
    const fileData = readFileSync(accessCheck.filePath!);
    return {
      success: true,
      data: fileData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to read file',
    };
  }
}

// ============================================
// FILE TYPE VALIDATION
// ============================================

export interface FileTypeValidation {
  allowed: boolean;
  mimeType?: string;
  error?: string;
}

/**
 * Validate file type based on extension
 */
export function validateFileType(filePath: string): FileTypeValidation {
  const extension = filePath.split('.').pop()?.toLowerCase();

  if (!extension) {
    return {
      allowed: false,
      error: 'File has no extension',
    };
  }

  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    txt: 'text/plain',
    zip: 'application/zip',
  };

  const mimeType = mimeTypes[extension];

  if (!mimeType) {
    return {
      allowed: false,
      error: 'File type is not recognized',
    };
  }

  return {
    allowed: true,
    mimeType,
  };
}

// ============================================
// SECURE FILE SERVING
// ============================================

export interface FileServeOptions {
  userId: string;
  userRole: string;
  download?: boolean;
  cacheControl?: string;
}

/**
 * Prepare file for serving with security checks
 */
export function prepareFileForServing(
  filePath: string,
  options: FileServeOptions
): {
  success: boolean;
  filePath?: string;
  mimeType?: string;
  headers?: Record<string, string>;
  error?: string;
} {
  // Check file access
  const accessCheck = checkFileAccess(filePath, options.userId, options.userRole);
  if (!accessCheck.allowed) {
    return {
      success: false,
      error: accessCheck.error,
    };
  }

  // Validate file type
  const typeValidation = validateFileType(filePath);
  if (!typeValidation.allowed) {
    return {
      success: false,
      error: typeValidation.error,
    };
  }

  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': typeValidation.mimeType!,
    'Cache-Control': options.cacheControl || 'private, max-age=3600',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };

  if (options.download) {
    const fileName = filePath.split('/').pop() || 'download';
    headers['Content-Disposition'] = `attachment; filename="${fileName}"`;
  }

  return {
    success: true,
    filePath: accessCheck.filePath,
    mimeType: typeValidation.mimeType,
    headers,
  };
}

// ============================================
// FILE UPLOAD SECURITY
// ============================================

export interface FileUploadSecurityOptions {
  maxSize?: number;
  allowedTypes?: string[];
  allowedExtensions?: string[];
  requireAuthentication?: boolean;
  requirePermission?: string;
}

/**
 * Validate file upload for security
 */
export function validateFileUpload(
  file: File,
  options: FileUploadSecurityOptions = {}
): { valid: boolean; error?: string } {
  const {
    maxSize = MAX_FILE_SIZE,
    allowedTypes,
    allowedExtensions,
  } = options;

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum of ${maxSize} bytes`,
    };
  }

  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  // Check file extension
  if (allowedExtensions) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(`.${extension}`)) {
      return {
        valid: false,
        error: `File extension .${extension} is not allowed`,
      };
    }
  }

  // Check for denied extensions
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension && DENIED_EXTENSIONS.includes(`.${extension}`)) {
    return {
      valid: false,
      error: `File extension .${extension} is not allowed for security reasons`,
    };
  }

  return { valid: true };
}

/**
 * Generate secure file name
 */
export function generateSecureFileName(originalName: string): string {
  const extension = originalName.split('.').pop();
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  
  if (extension) {
    return `${timestamp}-${randomString}.${extension}`;
  }
  
  return `${timestamp}-${randomString}`;
}

/**
 * Sanitize file name
 */
export function sanitizeFileName(fileName: string): string {
  // Remove any path traversal attempts
  const sanitized = fileName.replace(/[\/\\]/g, '');
  
  // Remove special characters except dots, hyphens, and underscores
  return sanitized.replace(/[^a-zA-Z0-9._-]/g, '');
}

// ============================================
// DOCUMENT ACCESS CONTROL
// ============================================

export interface DocumentAccessControl {
  userId: string;
  userRole: string;
  documentId: string;
  documentType: string;
  ownerId?: string;
}

/**
 * Check if user can access document
 */
export function canAccessDocument(access: DocumentAccessControl): boolean {
  const { userId, userRole, documentType, ownerId } = access;

  // Super admin can access everything
  if (userRole === 'SUPER_ADMIN') {
    return true;
  }

  // Admin can access most documents
  if (userRole === 'ADMIN') {
    return true;
  }

  // Users can access their own documents
  if (ownerId && userId === ownerId) {
    return true;
  }

  // Role-based document access
  const roleDocumentAccess: Record<string, string[]> = {
    LEGAL_OFFICER: ['VERIFICATION', 'LEGAL', 'COMPLIANCE'],
    FINANCE_OFFICER: ['PAYMENT', 'INVOICE', 'RECEIPT'],
    SURVEY_OFFICER: ['SURVEY', 'VERIFICATION'],
    SALES_OFFICER: ['PROPERTY', 'INVESTMENT'],
  };

  const allowedTypes = roleDocumentAccess[userRole];
  if (allowedTypes && allowedTypes.includes(documentType)) {
    return true;
  }

  return false;
}

/**
 * Get documents user can access
 */
export function getAccessibleDocuments(
  userId: string,
  userRole: string,
  documents: Array<{ id: string; type: string; ownerId?: string }>
): string[] {
  return documents
    .filter((doc) =>
      canAccessDocument({
        userId,
        userRole,
        documentId: doc.id,
        documentType: doc.type,
        ownerId: doc.ownerId,
      })
    )
    .map((doc) => doc.id);
}
