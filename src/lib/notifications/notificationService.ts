// Simple notification service for admin and client notifications
// In production, this would integrate with a real notification system like Pusher, Socket.io, or Supabase Realtime

export interface Notification {
  id: string;
  userId: string;
  type: 'inspection_request' | 'inspection_approved' | 'inspection_scheduled' | 'inspection_completed' | 'system';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export async function createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<void> {
  // In production, save to database
  console.log('Notification created:', notification);
}

export async function sendNotificationToUser(userId: string, notification: Omit<Notification, 'id' | 'createdAt' | 'userId'>): Promise<void> {
  await createNotification({
    ...notification,
    userId,
    read: false,
  });
}

export async function sendAdminNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'userId'>): Promise<void> {
  // Send to all admin users
  await createNotification({
    ...notification,
    userId: 'admin',
    read: false,
  });
}

// Notification templates
export const notificationTemplates = {
  inspectionRequest: (fullName: string, propertyTitle: string) => ({
    type: 'inspection_request' as const,
    title: 'New Inspection Request',
    message: `${fullName} has requested an inspection for ${propertyTitle}`,
    read: false,
  }),
  inspectionApproved: (propertyTitle: string, scheduledDate: string) => ({
    type: 'inspection_approved' as const,
    title: 'Inspection Approved',
    message: `Your inspection for ${propertyTitle} has been approved for ${scheduledDate}`,
    read: false,
  }),
  inspectionScheduled: (propertyTitle: string, scheduledDate: string) => ({
    type: 'inspection_scheduled' as const,
    title: 'Inspection Scheduled',
    message: `Inspection for ${propertyTitle} scheduled for ${scheduledDate}`,
    read: false,
  }),
};
