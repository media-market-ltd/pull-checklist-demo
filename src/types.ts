export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assigneeId: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
}
