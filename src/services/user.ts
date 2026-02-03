import type { User } from '../types.js';

export class UserService {
  private users: Map<string, User> = new Map();

  createUser(email: string, name: string): User {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      name,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }
}
