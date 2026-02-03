export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: Date;
}

export class NotificationService {
  private notifications: Map<string, Notification> = new Map();

  send(userId: string, message: string, type: Notification['type'] = 'info'): Notification {
    const notification: Notification = {
      id: crypto.randomUUID(),
      userId,
      message,
      type,
      read: false,
      createdAt: new Date(),
    };
    this.notifications.set(notification.id, notification);
    console.log(`[${type.toUpperCase()}] Notification sent to ${userId}: ${message}`);
    return notification;
  }

  getUnread(userId: string): Notification[] {
    return Array.from(this.notifications.values()).filter(
      (n) => n.userId === userId && !n.read
    );
  }

  markAsRead(id: string): boolean {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.read = true;
      return true;
    }
    return false;
  }

  getAll(userId: string): Notification[] {
    return Array.from(this.notifications.values()).filter(
      (n) => n.userId === userId
    );
  }
}
