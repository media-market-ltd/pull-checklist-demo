import { UserService } from './services/user.js';
import { TaskService } from './services/task.js';

export function main() {
  const userService = new UserService();
  const taskService = new TaskService();

  console.log('Pull Checklist Demo App Started');

  // Demo: Create a user
  const user = userService.createUser('demo@example.com', 'Demo User');
  console.log(`Created user: ${user.name}`);

  // Demo: Create a task
  const task = taskService.createTask('Review PR', user.id);
  console.log(`Created task: ${task.title}`);
}

main();
