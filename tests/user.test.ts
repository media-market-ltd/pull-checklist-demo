import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from '../src/services/user.js';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it('should create a user', () => {
    const user = userService.createUser('test@example.com', 'Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
    expect(user.id).toBeDefined();
  });

  it('should get a user by id', () => {
    const created = userService.createUser('test@example.com', 'Test User');
    const retrieved = userService.getUser(created.id);
    expect(retrieved).toEqual(created);
  });

  it('should return undefined for non-existent user', () => {
    const user = userService.getUser('non-existent-id');
    expect(user).toBeUndefined();
  });

  it('should delete a user', () => {
    const user = userService.createUser('test@example.com', 'Test User');
    const deleted = userService.deleteUser(user.id);
    expect(deleted).toBe(true);
    expect(userService.getUser(user.id)).toBeUndefined();
  });
});
