import { describe, it, expect, beforeEach } from 'vitest';
import { NotificationService } from '../src/services/notification.js';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    notificationService = new NotificationService();
  });

  it('should send a notification', () => {
    const notification = notificationService.send('user-123', 'Test message');
    expect(notification.userId).toBe('user-123');
    expect(notification.message).toBe('Test message');
    expect(notification.type).toBe('info');
    expect(notification.read).toBe(false);
  });

  it('should get unread notifications', () => {
    notificationService.send('user-123', 'Message 1');
    notificationService.send('user-123', 'Message 2');
    notificationService.send('user-456', 'Other user message');

    const unread = notificationService.getUnread('user-123');
    expect(unread).toHaveLength(2);
  });

  it('should mark notification as read', () => {
    const notification = notificationService.send('user-123', 'Test');
    notificationService.markAsRead(notification.id);

    const unread = notificationService.getUnread('user-123');
    expect(unread).toHaveLength(0);
  });

  it('should support different notification types', () => {
    const warning = notificationService.send('user-123', 'Warning!', 'warning');
    const error = notificationService.send('user-123', 'Error!', 'error');
    const success = notificationService.send('user-123', 'Success!', 'success');

    expect(warning.type).toBe('warning');
    expect(error.type).toBe('error');
    expect(success.type).toBe('success');
  });
});
