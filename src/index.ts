import { UserService } from './services/user.js';
import { TaskService } from './services/task.js';
import { NotificationService } from './services/notification.js';

export function main() {
  const userService = new UserService();
  const taskService = new TaskService();
  const notificationService = new NotificationService();

  console.log('Pull Checklist Demo App Started');

  // Demo: Create a user
  const user = userService.createUser('demo@example.com', 'Demo User');
  console.log(`Created user: ${user.name}`);

  // Demo: Create a task
  const task = taskService.createTask('Review PR', user.id);
  console.log(`Created task: ${task.title}`);

  // Demo: Send notification about the new task
  notificationService.send(user.id, `New task assigned: ${task.title}`, 'info');

  // Demo: Complete the task and notify
  taskService.updateTaskStatus(task.id, 'completed');
  notificationService.send(user.id, `Task completed: ${task.title}`, 'success');

  // Show unread notifications
  const unread = notificationService.getUnread(user.id);
  console.log(`User has ${unread.length} unread notifications`);
}

main();
