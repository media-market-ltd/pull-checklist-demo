import type { Task } from '../types.js';

export class TaskService {
  private tasks: Map<string, Task> = new Map();

  createTask(title: string, assigneeId: string, description?: string): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      assigneeId,
      status: 'pending',
      createdAt: new Date(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  getTasksByAssignee(assigneeId: string): Task[] {
    return Array.from(this.tasks.values()).filter(
      (task) => task.assigneeId === assigneeId
    );
  }

  updateTaskStatus(id: string, status: Task['status']): Task | undefined {
    const task = this.tasks.get(id);
    if (task) {
      task.status = status;
    }
    return task;
  }
}
