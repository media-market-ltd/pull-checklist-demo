import { describe, it, expect, beforeEach } from 'vitest';
import { TaskService } from '../src/services/task.js';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  it('should create a task', () => {
    const task = taskService.createTask('Test Task', 'user-123');
    expect(task.title).toBe('Test Task');
    expect(task.assigneeId).toBe('user-123');
    expect(task.status).toBe('pending');
  });

  it('should update task status', () => {
    const task = taskService.createTask('Test Task', 'user-123');
    const updated = taskService.updateTaskStatus(task.id, 'completed');
    expect(updated?.status).toBe('completed');
  });

  it('should get tasks by assignee', () => {
    taskService.createTask('Task 1', 'user-123');
    taskService.createTask('Task 2', 'user-123');
    taskService.createTask('Task 3', 'user-456');

    const tasks = taskService.getTasksByAssignee('user-123');
    expect(tasks).toHaveLength(2);
  });
});
